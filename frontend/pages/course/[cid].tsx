import type { NextPage, GetStaticProps, GetStaticPaths } from "next";
import Head from "next/head";
import Image from "next/image";
import styled from "@emotion/styled";

import { Course } from "@/components/Course";
import { Tile } from "@/components/Tile";

import { Course as CourseType, Response } from "@/types";

const CoursesWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 2vw;
  margin: 2vh 1vw;
`;

type CourseResponce = Response<CourseType>;
type CoursesResponce = Response<CourseType[]>;

export const getStaticPaths: GetStaticPaths = async () => {
  const api_url = process.env.NEXT_PUBLIC_STRAPI_API_URL;
  const ssr_token = process.env.SSR_TOKEN;

  const res = await fetch(`${api_url}/courses?populate=*`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${ssr_token}`,
    },
  });

  const response: CoursesResponce = await res.json();

  const status = response?.error?.status;

  if (status && (status < 200 || status >= 300)) {
    return {
      paths: [],
      fallback: true,
    };
  }

  const paths = response.data.map(({ id }) => `/course/${id}`);

  return {
    paths: paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const api_url = process.env.NEXT_PUBLIC_STRAPI_API_URL;
  const ssr_token = process.env.SSR_TOKEN;

  const cid = context?.params?.cid;

  const res = await fetch(`${api_url}/courses/${cid}?populate=*`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${ssr_token}`,
    },
  });

  const { error, data, meta }: CourseResponce = await res.json();

  if (error && (error?.status < 200 || error?.status >= 300)) {
    return {
      props: {
        course: {},
        meta: {},
      },
    };
  }

  return {
    props: {
      course: data,
      meta: meta,
    },
  };
};

const CoursePage: NextPage<{
  course: CourseType;
  meta: CourseResponce["meta"];
}> = ({
  course: {
    attributes: {
      header,
      description,
      publishedAt,
      cover: {
        data: {
          attributes: {
            formats: {
              large: { url, width, height },
            },
          },
        },
      },
    },
  },
}) => {
  return (
    <>
      <Head>
        <title>CoursesBox</title>
        <meta name="description" content={header} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Tile header={header}>
        <Image
          alt={`Cover for ${header}`}
          src={`http://localhost:1337${url}`}
          width={width}
          height={height}
        />
        <div>{description}</div>
        <h4>{publishedAt}</h4>
      </Tile>
    </>
  );
};

export default CoursePage;
