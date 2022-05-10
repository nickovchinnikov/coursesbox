import { useEffect, useState } from "react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import styled from "@emotion/styled";
import qs from "qs";

import { RootState } from "@/store";
import { selectUser } from "@/services/userSlice";
import { Course as CourseType, Response } from "@/types";

import { Course, Wrapper } from "@/components/Course";

const api_url = process.env.NEXT_PUBLIC_STRAPI_API_URL;

type CoursesResponce = Response<CourseType[]>;

const Header = styled.h3`
  padding: 0 2vmin;
`;

const headerRender = (q: string, courses?: CourseType[], error?: string) => {
  if (error) {
    return error;
  }
  return courses && Boolean(courses.length)
    ? `Search results for "${q}"`
    : `No results for "${q}"... 😞`;
};

const Search: NextPage = () => {
  const { jwt } = useSelector<RootState, RootState["user"]>(selectUser);
  const router = useRouter();
  const [courses, setCourses] = useState<CourseType[] | undefined>();
  const [error, setError] = useState<string | undefined>();
  const { q } = router.query;

  useEffect(() => {
    if (jwt) {
      const query = qs.stringify(
        {
          populate: "*",
          filters: {
            $or: [
              {
                header: {
                  $containsi: q,
                },
              },
              {
                subtitle: {
                  $containsi: q,
                },
              },
              {
                description: {
                  $containsi: q,
                },
              },
            ],
          },
        },
        {
          encodeValuesOnly: true,
        }
      );
      const fetchData = async () => {
        const res = await fetch(`${api_url}/courses?${query}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        });
        const { data, error }: CoursesResponce = await res.json();

        const status = error?.status;

        if (status && (status < 200 || status >= 300)) {
          setError(error.message);
        }

        setCourses(data);
      };
      fetchData();
    }
  }, [q, jwt]);

  return (
    <>
      <Header>{headerRender(q as string, courses, error)}</Header>
      <Wrapper>
        {courses &&
          courses.map(
            ({
              id,
              attributes: {
                header,
                subtitle,
                publishedAt,
                cover: {
                  data: {
                    attributes: {
                      formats: {
                        medium: { url, width, height },
                      },
                    },
                  },
                },
              },
            }) => (
              <Course
                key={id}
                header={header}
                link={`/course/${id}`}
                imageProps={{
                  width,
                  height,
                  alt: `Cover for ${header}`,
                  src: `http://localhost:1337${url}`,
                }}
              >
                <h3>{subtitle}</h3>
                <time dateTime={publishedAt}>
                  {new Date(publishedAt).toDateString()}
                </time>
              </Course>
            )
          )}
      </Wrapper>
    </>
  );
};

export default Search;
