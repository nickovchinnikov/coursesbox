import { FC } from "react";
import Link from "next/link";
import Image, { ImageProps } from "next/image";
import styled from "@emotion/styled";

import { Course as CourseType } from "@/types";

import { boxShadow, borderRadius } from "@/components/styles";
import { StyledLink } from "@/components/StyledLink";

const Section = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 2vmin;
  background: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.font.regular};
  ${borderRadius};
  ${({ theme }) =>
    boxShadow(theme.components.shadow1, theme.components.shadow2)};
`;

const CourseLink = styled(StyledLink)`
  display: flex;
  width: 94vw;
  @media (min-width: 900px) {
    width: 46vw;
  }
`;

export type Props = {
  /** Header string */
  header: string;
  /** Link address */
  link: string;
  /** Image props */
  imageProps: ImageProps;
};

export const Course: FC<Props> = ({ children, header, link, imageProps }) => (
  <Link href={link} passHref>
    <CourseLink>
      <Section>
        <h2>{header}</h2>
        <Image {...imageProps} alt={header} />
        {children}
      </Section>
    </CourseLink>
  </Link>
);

export const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 2vw;
  margin: 2vh 1vw;
`;

export const Courses: FC<{ courses: CourseType[]; strapi_url: string }> = ({
  courses,
  strapi_url,
}) => (
  <Wrapper>
    {courses?.map(
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
  </Wrapper>
);
