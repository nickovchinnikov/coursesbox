import type { NextPage, GetStaticProps } from "next";
import Head from "next/head";
import styled from "@emotion/styled";

import { Course } from "@/components/Course";

import { Course as CourseType, Response } from "@/types";

const CoursesWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 2vw;
  margin: 2vh 1vw;
`;

type CoursesResponce = Response<CourseType[]>;

export const getStaticProps: GetStaticProps = async () => {
  const api_url = process.env.NEXT_PUBLIC_STRAPI_API_URL;
  const ssr_token = process.env.SSR_TOKEN;

  const res = await fetch(`${api_url}/courses?populate=*`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${ssr_token}`,
    },
  });

  const { data, meta, error }: CoursesResponce = await res.json();

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
      courses: data,
      meta: meta,
    },
  };
};

const Home: NextPage<{
  courses: CourseType[];
  meta: CoursesResponce["meta"];
}> = ({ courses }) => {
  return (
    <>
      <Head>
        <title>Courses</title>
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
      </CoursesWrapper>
    </>
  );
};

export default Home;
