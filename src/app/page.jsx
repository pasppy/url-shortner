"use client"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import CountUp from 'react-countup';
import React, { useEffect, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import useFetch from "@/hooks/useFetch";
import { getAllClicks, getAllURLs, getAllUsers } from "@/lib/apiMetric";

const formatNumberForMetrics = (num) => {
  if (num < 10) return num;
  if (num < 100) return Math.floor(num / 10) * 10;
  if (num < 1000) return Math.floor(num / 100) * 100;
  if (num < 10000) return Math.floor(num / 1000);

  return Math.floor(num / 1000);
};

export default function Home() {
  const router = useRouter()
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalClicks, setTotalClicks] = useState(0);
  const [linksGenerated, setLinksGenerated] = useState(0);
  const [longUrl, setLongUrl] = useState("");

  const { loading: urlLoading, data: urlsData, fn: fnUrls } = useFetch(getAllURLs);
  const { loading: clicksLoading, data: clicksData, fn: fnClick } = useFetch(getAllClicks);
  const { loading: usersLoading, data: usersData, fn: fnUsers } = useFetch(getAllUsers);

  useEffect(() => {
    fnUrls();
    fnClick();
    fnUsers();
  }, []);

  useEffect(() => {

    if (usersData) setTotalUsers(formatNumberForMetrics(usersData));
    if (urlsData) setLinksGenerated(formatNumberForMetrics(urlsData.length));
    if (clicksData) setTotalClicks(formatNumberForMetrics(clicksData.length));
  }, [urlsData, clicksData, usersData])

  const handleShorten = (e) => {
    e.preventDefault();
    if (longUrl) router.push(`/auth?createNew=${longUrl}`)
  }

  return (
    <div className="flex flex-col items-center">
      <h2 className="my-10 sm:my-16  text-4xl sm:text-6xl lg:text-7xl text-center font-extrabold">
        The only <span className="bg-[#5333ec] text-white">URL shortner </span>
        <br />you will ever need.
      </h2>

      <form className=" sm:h-14 flex flex-col sm:flex-row w-full md:w-2/4 gap-2">
        <Input
          type={"url"}
          value={longUrl}
          onChange={(e) => setLongUrl(e.target.value)}
          placeholder="Enter your long URL"
          className={"bg-gray-200 max-md:p-3 h-full flex-1"} />
        <Button
          type="submit"
          onClick={handleShorten}
          variant="destructive"
          className={"sm:h-full max-md:p-6"}> Shorten</Button>

      </form>

      {/* user metrics */}
      <div className="bg-secondary p-8 rounded-md mt-16 gap-4 w-full grid sm:grid-cols-3" >
        <Card className={"p-6"}>
          <CardTitle className={""}>Total Users</CardTitle>
          <CardDescription className={"text-4xl"}><CountUp end={totalUsers} duration={1.5} />+</CardDescription>
        </Card>
        <Card className={"p-6"}>
          <CardTitle>Links Generated</CardTitle>
          <CardDescription className={"text-4xl"}><CountUp end={linksGenerated} duration={1.5} />+</CardDescription>

        </Card>
        <Card className={"p-6"}>
          <CardTitle>Total Clicks</CardTitle>
          <CardDescription className={"text-4xl"}><CountUp end={totalClicks} duration={1.5} />+</CardDescription>

        </Card>
      </div>

      <img src="/banner.png" alt="" className="w-full my-11 md:px-11" />

      <Accordion type="single" collapsible className="mb-11 w-full md:px-11">
        <AccordionItem value="item-1">
          <AccordionTrigger>
            How does this URL shortener works?
          </AccordionTrigger>
          <AccordionContent className={"text-gray-500 dark:text-gray-400"}>
            When you enter a long URL, our system generates a shorter version of
            that URL. This shortened URL redirects to the original long URL when
            accessed.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>
            Do I need an account to use the app?
          </AccordionTrigger>
          <AccordionContent className={"text-gray-500 dark:text-gray-400"}>
            Yes. Creating an account allows you to manage your URLs, view
            analytics, and customize your short URLs.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>
            What analytics are available for my shortened URLs?
          </AccordionTrigger>
          <AccordionContent className={"text-gray-500 dark:text-gray-400"}>
            You can view the number of clicks, geolocation data of the clicks
            and device types (mobile/desktop) for each of your shortened URLs.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
