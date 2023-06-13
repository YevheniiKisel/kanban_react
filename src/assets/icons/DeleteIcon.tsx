import { FC } from "react";

type DeleteIconProps = {
  theme: "light" | "dark";
};

const DeleteIcon: FC<DeleteIconProps> = ({ theme }) => {
  return (
    <>
      {theme === "light" ? (
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M9.4 16.5L12 13.9L14.6 16.5L16 15.1L13.4 12.5L16 9.9L14.6 8.5L12 11.1L9.4 8.5L8 9.9L10.6 12.5L8 15.1L9.4 16.5ZM7 21C6.45 21 5.979 20.804 5.587 20.412C5.195 20.02 4.99933 19.5493 5 19V6H4V4H9V3H15V4H20V6H19V19C19 19.55 18.804 20.021 18.412 20.413C18.02 20.805 17.5493 21.0007 17 21H7ZM17 6H7V19H17V6Z"
            fill="black"
          />
        </svg>
      ) : (
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M9.4 16.5L12 13.9L14.6 16.5L16 15.1L13.4 12.5L16 9.9L14.6 8.5L12 11.1L9.4 8.5L8 9.9L10.6 12.5L8 15.1L9.4 16.5ZM7 21C6.45 21 5.979 20.804 5.587 20.412C5.195 20.02 4.99933 19.5493 5 19V6H4V4H9V3H15V4H20V6H19V19C19 19.55 18.804 20.021 18.412 20.413C18.02 20.805 17.5493 21.0007 17 21H7Z"
            fill="black"
          />
        </svg>
      )}
    </>
  );
};

export default DeleteIcon;