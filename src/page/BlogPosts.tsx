// src/page/BlogPosts.tsx
import React from "react";
import { useParams, Link } from "react-router-dom";
import remarkGfm from "remark-gfm";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import { blogs } from "../data/blogs";
import { ArrowLeft, Calendar, Tag, Clock, Sparkles } from "lucide-react";
import Footer from "../components/Footer";

export default function BlogPost() {
  const { id } = useParams();
  const blog = blogs.find((b) => String(b.id) === id);

  if (!blog) {
    return (
      <div className="pt-24 min-h-screen flex flex-col justify-between">
        <div className="max-w-md mx-auto px-4 text-center my-auto">
          <div className="p-8 rounded-2xl border-2 border-black bg-[#fffdf7] shadow-[6px_6px_0_black] space-y-4">
            <span className="px-3 py-1 rounded-full text-xs font-bold border-2 border-black bg-yellow-400 text-black">
              404 • POST NOT FOUND
            </span>
            <h2 className="text-2xl font-bold text-black">Article Not Found</h2>
            <p className="text-neutral-700 text-sm">
              The blog post you're looking for doesn't exist or has moved.
            </p>
            <div className="pt-2">
              <Link
                to="/knowledge"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border-2 border-black bg-blue-500 hover:bg-blue-600 text-white font-bold text-sm shadow-[3px_3px_0_black] hover:shadow-[3px_3px_0_#facc15] hover:-translate-y-0.5 transition-all"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Knowledge Hub</span>
              </Link>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="pt-20 sm:pt-24 min-h-screen flex flex-col justify-between">
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1 pb-16">
        {/* Navigation Breadcrumb / Back Link */}
        <div className="mb-6">
          <Link
            to="/knowledge"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border-2 border-black bg-white text-black font-bold text-xs sm:text-sm shadow-[3px_3px_0_black] hover:shadow-[3px_3px_0_#facc15] hover:-translate-y-0.5 transition-all duration-200"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Knowledge Hub</span>
          </Link>
        </div>

        {/* Main Article Container */}
        <article className="rounded-3xl border-2 border-black bg-[#fffdf7] text-black shadow-[8px_8px_0_black] overflow-hidden p-6 sm:p-10">
          {/* Header Metadata */}
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="px-3 py-1 rounded-full text-xs font-bold border-2 border-black bg-yellow-400 text-black shadow-[2px_2px_0_black] uppercase tracking-wider">
                {blog.category}
              </span>
              <div className="flex items-center gap-4 text-xs font-semibold text-neutral-600 ml-1">
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-neutral-500" />
                  <span>{new Date(blog.date).toLocaleDateString("en-GB")}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-neutral-500" />
                  <span>{blog.readTime}</span>
                </div>
              </div>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-black leading-tight">
              {blog.title}
            </h1>

            {/* Author Attribution */}
            <div className="flex flex-wrap items-center gap-1.5 text-sm text-neutral-700 font-medium pt-1 pb-4 border-b-2 border-black/10">
              <span className="text-neutral-500">Written by</span>
              {Array.isArray(blog.author) ? (
                blog.author.map((a, index) => (
                  <span key={index}>
                    <a
                      href={a.insta}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 font-bold hover:underline"
                    >
                      {a.name}
                    </a>
                    {index < blog.author.length - 2 && ", "}
                    {index === blog.author.length - 2 && " & "}
                  </span>
                ))
              ) : (
                <span className="font-bold text-black">{blog.author}</span>
              )}
            </div>
          </div>

          {/* Featured Image */}
          <div className="my-6 rounded-2xl border-2 border-black overflow-hidden shadow-[4px_4px_0_black] bg-neutral-100">
            <img
              src={blog.image}
              alt={blog.title}
              decoding="async"
              fetchPriority="high"
              className={`w-full ${
                blog.id === 11
                  ? "max-h-72 object-contain p-4 bg-white"
                  : "max-h-[460px] object-cover"
              }`}
            />
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-8">
            {blog.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg border-2 border-black/15 bg-white text-neutral-900 text-xs font-semibold shadow-[2px_2px_0_black]"
              >
                <Tag className="w-3.5 h-3.5 text-neutral-500" />
                <span>{tag}</span>
              </span>
            ))}
          </div>

          {/* Markdown Blog Content with Neo-Brutalist Renderers */}
          <div className="markdown-content text-neutral-800 leading-relaxed space-y-4">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeRaw]}
              components={{
                h1: ({ node, ...props }) => (
                  <h1
                    className="text-2xl sm:text-3xl font-extrabold text-black mt-8 mb-4 tracking-tight pb-2 border-b-2 border-black/10"
                    {...props}
                  />
                ),
                h2: ({ node, ...props }) => (
                  <h2
                    className="text-xl sm:text-2xl font-bold text-black mt-7 mb-3 tracking-tight"
                    {...props}
                  />
                ),
                h3: ({ node, ...props }) => (
                  <h3
                    className="text-lg sm:text-xl font-bold text-black mt-5 mb-2"
                    {...props}
                  />
                ),
                p: ({ node, ...props }) => (
                  <p
                    className="text-base text-neutral-800 leading-relaxed mb-4 font-normal"
                    {...props}
                  />
                ),
                ul: ({ node, ...props }) => (
                  <ul
                    className="list-disc list-outside pl-6 space-y-1.5 text-neutral-800 mb-4"
                    {...props}
                  />
                ),
                ol: ({ node, ...props }) => (
                  <ol
                    className="list-decimal list-outside pl-6 space-y-1.5 text-neutral-800 mb-4"
                    {...props}
                  />
                ),
                li: ({ node, ...props }) => (
                  <li className="leading-relaxed" {...props} />
                ),
                a: ({ node, ...props }) => (
                  <a
                    className="text-blue-600 font-bold hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                    {...props}
                  />
                ),
                blockquote: ({ node, ...props }) => (
                  <blockquote
                    className="border-l-4 border-yellow-400 pl-4 py-2 italic my-5 bg-yellow-50 rounded-r-xl border-2 border-l-4 border-black text-neutral-800 shadow-[2px_2px_0_black]"
                    {...props}
                  />
                ),
                table: ({ node, ...props }) => (
                  <div className="overflow-x-auto my-6 rounded-2xl border-2 border-black shadow-[4px_4px_0_black]">
                    <table className="w-full text-left border-collapse text-sm bg-white" {...props} />
                  </div>
                ),
                th: ({ node, ...props }) => (
                  <th
                    className="border-b-2 border-black bg-yellow-200/80 p-3.5 font-bold text-black text-xs sm:text-sm uppercase tracking-wider"
                    {...props}
                  />
                ),
                td: ({ node, ...props }) => (
                  <td
                    className="border-b border-black/10 p-3.5 text-neutral-800 font-medium text-xs sm:text-sm"
                    {...props}
                  />
                ),
                code: ({ node, inline, className, children, ...props }: any) => {
                  return inline ? (
                    <code
                      className="px-1.5 py-0.5 rounded-md border border-black/20 bg-neutral-100 text-red-600 font-mono text-xs sm:text-sm font-semibold"
                      {...props}
                    >
                      {children}
                    </code>
                  ) : (
                    <pre className="p-4 sm:p-5 rounded-2xl border-2 border-black bg-neutral-900 text-neutral-100 font-mono text-xs sm:text-sm overflow-x-auto my-5 shadow-[4px_4px_0_black]">
                      <code className={className} {...props}>
                        {children}
                      </code>
                    </pre>
                  );
                },
                hr: ({ node, ...props }) => (
                  <hr className="my-8 border-t-2 border-black/10" {...props} />
                ),
              }}
            >
              {blog.content}
            </ReactMarkdown>
          </div>

          {/* Article Footer */}
          <div className="mt-10 pt-6 border-t-2 border-black/10 flex flex-wrap items-center justify-between gap-4">
            <Link
              to="/knowledge"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border-2 border-black bg-blue-500 hover:bg-blue-600 text-white font-bold text-sm shadow-[3px_3px_0_black] hover:shadow-[3px_3px_0_#facc15] hover:-translate-y-0.5 transition-all"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Explore More Articles</span>
            </Link>
            <span className="text-xs font-bold text-neutral-500 uppercase tracking-wider">
              Published by μCR Hub
            </span>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
}
