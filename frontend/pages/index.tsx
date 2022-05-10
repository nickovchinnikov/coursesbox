import type { NextPage, GetStaticProps } from "next";
import Head from "next/head";
import styled from "@emotion/styled";

import { Course as CourseType, Response } from "@/types";
import { Course } from "@/components/Course";

const CoursesWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 2vw;
  margin: 2vh 1vw;
`;

type CoursesResponce = Response<CourseType[]>;

export const getStaticProps: GetStaticProps = async () => {
  const api_url = process.env.NEXT_PUBLIC_STRAPI_API_URL;

  const responce = await fetch(`${api_url}/courses?populate=*`, {
    method: "GET",
  });

  const { data: courses, meta, error }: CoursesResponce = await responce.json();

  const status = error?.status;

  if (status && (status < 200 || status >= 300)) {
    return {
      props: {
        courses: [],
        meta: {},
      },
    };
  }

  return {
    props: {
      courses,
      meta,
    },
  };
};

const strapi_url = process.env.NEXT_PUBLIC_STRAPI_URL;

const Home: NextPage<{
  courses: CourseType[];
}> = ({ courses }) => (
  <>
    <Head>
      <title>CoursesBox</title>
      <meta name="description" content="IT courses for everyone" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <CoursesWrapper>
      {courses.map(
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
              src: `${strapi_url}${url}`,
            }}
          >
            <h3>{subtitle}</h3>
            <time dateTime={publishedAt}>
              {new Date(publishedAt).toDateString()}
            </time>
          </Course>
        )
      )}
    </CoursesWrapper>
  </>
);

export default Home;
