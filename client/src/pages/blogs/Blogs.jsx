import { MainLayout } from "../../components"

export const Blogs = () => {
  return (
    <MainLayout>
      <div className="bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] py-52 px-8 relative overflow-hidden" style={{ minHeight: 'calc(100vh - 100px)' }}>
        <div>
          <form action="http://localhost:3000/upload" method="POST" encType="multipart/form-data">
            <input type="file" name="profileImage" />
            <button type="submit" className="bg-indigo-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-indigo-500 transition-colors duration-300">Upload</button>
          </form>

        </div>

      </div>
    </MainLayout>
  );
};
