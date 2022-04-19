import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import * as React from "react";
import Header from "../components/common/header";

export interface AboutProps {}

/**
 * import dynamic
 */

// const HeaderDynamic = dynamic(() => import("../components/common/header"), {
//   ssr: false,
// });

export default function AboutPage(props: AboutProps) {
  const route = useRouter();
  const [postList, setPostList] = React.useState([]);
  const pageNumber = route.query?.page;

  React.useEffect(() => {
    if (!pageNumber) {
      return;
    }

    (async () => {
      const response = await fetch(
        `https://js-post-api.herokuapp.com/api/posts?_page=${pageNumber}`
      );
      const data = await response.json();
      setPostList(data.data);
    })();
  }, [pageNumber]);

  const handleNextPage = () => {
    route.push(
      {
        pathname: "/about",
        query: {
          page: Number(pageNumber || 1) + 1,
        },
      },
      undefined,
      /**
       * shallow routing.
       * Change url without running getStaticProps, getServerSideProps, getInitialProps
       */
      { shallow: true }
    );
  };

  return (
    <div>
      <Header />
      About Page
      <br />
      <ul>
        {postList.map((post: any) => (
          <li>{post.title}</li>
        ))}
      </ul>
      <br />
      <button onClick={handleNextPage}>Next page</button>
    </div>
  );
}

export async function getStaticProps() {
  console.log("getStaticProps");
  return {
    props: {},
  };
}
