import type { NextPage, GetStaticProps, GetStaticPaths } from "next";
import Head from "next/head";
import Image from "next/image";
import styled from "@emotion/styled";
import MarkdownIt from "markdown-it";

import { Course as CourseType, Response } from "@/types";

import { Tile, CenteredTile } from "@/components/Tile";

const ImageContainer = styled.div<{ maxWidth: string; maxHeight: string }>`
  position: relative;
  width: 100%;
  max-width: ${({ maxWidth }) => maxWidth};
  height: 30vw;
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

  const id = context?.params?.id;

  const res = await fetch(`${api_url}/courses/${id}?populate=*`, {
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

  const md = new MarkdownIt();

  return {
    props: {
      course: {
        ...data,
        attributes: {
          ...data.attributes,
          description: md.render(data.attributes.description),
        },
      },
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
}) => (
  <>
    <Head>
      <title>CoursesBox</title>
      <meta name="description" content={header} />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <CenteredTile header={header}>
      <ImageContainer maxWidth={`${width}px`} maxHeight={`${height}px`}>
        <Image
          layout="fill"
          alt={`Cover for ${header}`}
          src={`http://localhost:1337${url}`}
          objectFit="contain"
        />
      </ImageContainer>
      <div
        style={{ maxWidth: width }}
        dangerouslySetInnerHTML={{ __html: description }}
      />
      <h4>{new Date(publishedAt).toDateString()}</h4>
    </CenteredTile>
  </>
);

export default CoursePage;
