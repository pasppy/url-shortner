"use client"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export default function Home() {
  const router = useRouter()
  const [longUrl, setLongUrl] = useState("");

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
