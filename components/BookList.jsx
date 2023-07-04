import Link from "next/link";

const BookList = ({ posts }) => {
  return (
    <>
      <aside className="w-60 border-r-[1px] border-r-white flex flex-col items-center pl-7 pt-4 bg-slate-900">
        <ul>
          {posts?.map((post) => (
            <li key={post.title}>
              <Link
                href={`/study/${post.note}/${post._raw.flattenedPath}`}
                legacyBehavior
                key={post.title}
              >
                <a>{post.title}</a>
              </Link>
            </li>
          ))}
        </ul>
      </aside>
    </>
  );
};

export default BookList;
