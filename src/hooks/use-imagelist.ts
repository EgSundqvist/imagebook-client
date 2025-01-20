import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchImagesPage } from "../services/image-service";
import { ImageData } from "../types/image";

export const useImageList = () => {
  const {
    data,
    status,
    error,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ["images"],
    queryFn: ({ pageParam = 1 }) => fetchImagesPage(pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      const nextPage = lastPage.data.length ? allPages.length + 1 : undefined;
      return nextPage;
    },
  });

  const images: ImageData[] = data?.pages.flatMap((page) => page.data) || [];

  return {
    images,
    status,
    error,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  };
};