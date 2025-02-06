function Loading() {
  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 bg-gray-200 bg-opacity-25 flex items-center justify-center">
      <div className="p-4 rounded-md">
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-4 border-white"></div>
        </div>
      </div>
    </div>
  );
}

export default Loading;
