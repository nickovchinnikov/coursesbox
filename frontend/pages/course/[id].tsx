import type { NextPage, GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import styled from "@emotion/styled";
import MarkdownIt from "markdown-it";

import { Course as CourseType, Response } from "@/types";
import { CenteredTile } from "@/components/Tile";
import { StyledLink } from "@/components/StyledLink";

const ImageContainer = styled.div<{ maxWidth: string }>`
  position: relative;
  width: 100%;
  max-width: ${({ maxWidth }) => maxWidth};
  height: 30vw;
`;

const CustomLink = styled(StyledLink)`
  text-decoration: underline;
  font-size: 2rem;
`;

type CourseResponce = Response<CourseType>;
type CoursesResponce = Response<CourseType[]>;

export const getStaticPaths: GetStaticPaths = async () => {
  const api_url = process.env.NEXT_PUBLIC_STRAPI_API_URL;

  const res = await fetch(`${api_url}/courses?populate=*`, {
    method: "GET",
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
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const api_url = process.env.NEXT_PUBLIC_STRAPI_API_URL;

  const id = context?.params?.id;

  const res = await fetch(`${api_url}/courses/${id}?populate=*`, {
    method: "GET",
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

const strapi_url = process.env.NEXT_PUBLIC_STRAPI_URL;

const CoursePage: NextPage<{
  course: CourseType;
  meta: CourseResponce["meta"];
}> = ({ course }) => {
  if (course && course?.attributes) {
    const {
      attributes: {
        header,
        link,
        description,
        publishedAt,
        cover: {
          data: {
            attributes: {
              formats: {
                large: { url, width },
              },
            },
          },
        },
      },
    } = course;
    return (
      <>
        <Head>
          <title>Course: {header}</title>
          <meta name="description" content={header} />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <CenteredTile header={header}>
          <ImageContainer maxWidth={`${width}px`}>
            <Image
              layout="fill"
              alt={`Cover for ${header}`}
              src={`${strapi_url}${url}`}
              objectFit="contain"
            />
          </ImageContainer>
          <Link href={link} passHref>
            <CustomLink>Enroll now!</CustomLink>
          </Link>
          <div
            style={{ maxWidth: width }}
            dangerouslySetInnerHTML={{ __html: description }}
          />
          <Link href={link} passHref>
            <CustomLink>Enroll now!</CustomLink>
          </Link>
          <h4>{new Date(publishedAt).toDateString()}</h4>
        </CenteredTile>
      </>
    );
  }
  return null;
};

export default CoursePage;
