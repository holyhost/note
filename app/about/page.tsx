import { Metadata } from "next";
import About from "@/components/About/About";

export const metadata: Metadata = {
  title: '关于: 小池谭记',
  description: '关于小池谭记：博客，记录笔记，积累经验，分享生活点滴，基于nextjs框架的前端项目。',
}

export default function AboutPage() {
  return (
    <>
      <About/>
    </>
  );
}
