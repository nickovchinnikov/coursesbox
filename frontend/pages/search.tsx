import { useEffect, useState } from "react";
import type { NextPage, GetServerSideProps } from "next";
import { useRouter } from "next/router";
import styled from "@emotion/styled";
import qs from "qs";

import { Course as CourseType, Response } from "@/types";

import { Courses } from "@/components/Course";

type CoursesResponce = Response<CourseType[]>;

const fetchCourses = async (q: string) => {
  const api_url = process.env.NEXT_PUBLIC_STRAPI_API_URL;

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

  const res = await fetch(`${api_url}/courses?${query}`, {
    method: "GET",
  });

  const result: CoursesResponce = await res.json();

  return result;
};

const Header = styled.h3`
  padding: 0 2vmin;
`;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const q = (context?.query?.q as string) || null;

  if (!q) {
    return {
      props: {
        courses: [],
      },
    };
  }

  const { data, error }: CoursesResponce = await fetchCourses(q);

  const status = error?.status;

  if (status && (status < 200 || status >= 300)) {
    return {
      props: {
        error: error?.message,
      },
    };
  }

  return {
    props: {
      courses: data,
    },
  };
};

const headerRender = (q: string, courses?: CourseType[], error?: string) => {
  if (error) {
    return error;
  }
  return courses && Boolean(courses.length)
    ? `Search results for "${q}"`
    : `No results for "${q}"... 😞`;
};

const strapi_url = process.env.NEXT_PUBLIC_STRAPI_URL;

const Search: NextPage<{ courses: CourseType[]; error?: string }> = ({
  courses: ssrCourses,
  error: ssrError,
}) => {
  const router = useRouter();
  const { q } = router.query;

  const [courses, setCourses] = useState<CourseType[] | undefined>(ssrCourses);
  const [error, setError] = useState<string | undefined>(ssrError);

  useEffect(() => {
    const fetchData = async () => {
      const { data, error }: CoursesResponce = await fetchCourses(String(q));

      const status = error?.status;

      if (status && (status < 200 || status >= 300)) {
        setError(error.message);
      }

      setCourses(data);
    };
    fetchData();
  }, [q]);

  return (
    <>
      <Header>{headerRender(q as string, courses, error)}</Header>
      {courses && <Courses courses={courses} strapi_url={String(strapi_url)} />}
    </>
  );
};

export default Search;
