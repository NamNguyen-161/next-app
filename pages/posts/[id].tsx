import { useRouter } from "next/router";
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next";
import * as React from "react";

export interface PostDetailProps {
  post: any;
}

export default function PostDetail({ post }: PostDetailProps) {
  const route = useRouter();

  // when fallback in getStaticPaths = true
  if (route.isFallback) {
    return <div style={{ fontSize: "2rem", textAlign: "center" }}>Loading</div>;
  }
  if (!post) {
    return null;
  }

  return (
    <div>
      <h1>Post details:</h1>
      <p>{post.title}</p>
      <p>{post.author}</p>
      <p>{post.description}</p>
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const response = await fetch(
    "https://js-post-api.herokuapp.com/api/posts?_page=1"
  );
  const data = await response.json();

  return {
    paths: data.data.map((post: any) => ({ params: { id: post.id } })),
    /**
     * false: return error page when id include getStaticPaths
     * true: render before page loading and wait getStaticProps build page. Then build done, re-render UI
     * blocking: call getStaticProps fetch data
     */
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps<PostDetailProps> = async (
  context: GetStaticPropsContext
) => {
  const postId = context.params?.id;
  if (!postId) {
    return { notFound: true };
  }
  const response = await fetch(
    `https://js-post-api.herokuapp.com/api/posts/${postId}`
  );
  const data = await response.json();
  return {
    props: {
      post: data,
    },
    /**
     * ISR: update page after 5s
     * Keep stale page in 5s
     * After 5s, first request send, it will render stale page and trigger action render new page and save cache.
     * Next request, it will new page
     */
    revalidate: 5,
  };
};
