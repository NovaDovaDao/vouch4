import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <section className="lg:grid lg:h-screen lg:place-content-center">
      <div className="mx-auto w-screen max-w-screen-xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
        <div className="mx-auto max-w-prose text-center">
          <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl dark:text-white">
            404
          </h1>

          <p className="mt-4 text-base text-pretty text-gray-700 sm:text-lg/relaxed dark:text-gray-200">
            Page not found.
          </p>

          <div className="mt-4 flex justify-center gap-4 sm:mt-6">
            <Link to="/">Go home</Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NotFoundPage;
