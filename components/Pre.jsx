import { CopyButton } from "./CopyButton";

export const Pre = ({ children, raw, ...props }) => {
  const lang = props["data-language"];
  return (
    <pre {...props} className={"p-0"}>
      <div
        className={
          "relative top-0 left-0 flex w-full h-8 items-center justify-between px-4 bg-gray-300 text-sm text-gray-900 dark:bg-slate-900 dark:text-slate-400"
        }
      >
        {lang}
        <CopyButton text={raw} />
      </div>
      <div className="px-4 py-2">{children}</div>
    </pre>
  );
};
