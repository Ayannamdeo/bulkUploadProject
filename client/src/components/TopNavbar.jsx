import { Navbar, Typography } from "@material-tailwind/react";

export const TopNavbar = () => {
  return (
    <Navbar
      variant="gradient"
      color="blue-gray"
      className="min-w-full from-blue-gray-900 to-blue-gray-800 px-4 py-3 shadow-lg shadow-blue-gray-300"
      style={{ borderRadius: "0" }} // This removes rounded corners
    >
      <div className="flex flex-wrap items-center justify-between gap-y-4 text-gray-200">
        <Typography
          as="a"
          href="/"
          variant="h6"
          className="mr-4 ml-2 font-semibold cursor-pointer py-1.5"
        >
          Gridify – focusing on transforming CSV data into a powerful grid.
        </Typography>
      </div>
    </Navbar>
  );
};
