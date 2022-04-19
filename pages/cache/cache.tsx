import { count } from "console";
import { GetServerSidePropsContext } from "next";
import * as React from "react";

export interface CacheProps {
  value: number;
}

export default function CacheOnlyMaxAge(props: CacheProps) {
  return <div>Cache control: {props.value}</div>;
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  /**
   * save result of getServerSideProps 5s in cache.
   * In 5s, every request to API, response result in cache and no call to getServerSideProps.
   * when after 5s, if call getServerSideProps, it will call getServerSideProps and response new result
   */
  context.res.setHeader("Cache-Control", "s-maxage=5");

  /**
   * save result of getServerSideProps 5s in cache.
   * After 5s, when call getServerSideProps, it return stale value in cache and below action call again getServerSideProps and save new value in cache
   * Next call getServerSideProps, it will return new value save in cache
   */
  context.res.setHeader("Cache-Control", "s-maxage=5, stale-while-revalidate");

  /**
   * save result of getServerSideProps 5s in cache.
   * in 5s continues, when call getServerSideProps, it return stale value in cache and below action call again getServerSideProps and save new value in cache.
   * after 10s (5s in cache and 5s save stale value) , it call again getServerSideProps and return new value and save cache
   */
  context.res.setHeader(
    "Cache-Control",
    "s-maxage=5, stale-while-revalidate=5"
  );

  let count = 0;

  await new Promise((res) => setTimeout(res, 3000));
  return {
    props: {
      value: count,
    },
  };
}
