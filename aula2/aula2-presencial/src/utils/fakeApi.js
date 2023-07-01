import { blobToBase64 } from "./blobToBase64";

export const fakeApi = {
  get: (url) => {
    return new Promise((resolve, reject) => {
      switch (url) {
        case "users":
          resolve({
            data: [
              {
                username: "artistrea",
                email: "apiravesi@hotmail.com",
                imageUrl: "chrome://branding/content/about-logo.png",
              },
              {
                username: "pafev",
                email: "paulada@hotmail.com",
                imageUrl: "https://vitejs.dev/logo.svg",
              },
            ],
          });
          break;

        default:
          reject({ code: 404, message: "Route not found" });
          break;
      }
    });
  },
  // Não realmente funciona, mas dá pro teste:
  post: (url, params) => {
    return new Promise((resolve, reject) => {
      switch (url) {
        case "users/create":
          createUser({ params, resolve, reject });
          break;

        default:
          reject({ code: 404, message: "Route not found" });
          break;
      }
    });
  },
};

async function createUser({ params, resolve, reject }) {
  if (!validateUserParams(params)) {
    reject({ code: 422, message: "Invalid user." });
    return;
  }

  const { username, image, email } = params;

  const imageUrl = await blobToBase64(image);

  resolve({ data: { username, imageUrl, email } });
}

function validateUserParams(user) {
  if (!user.username) return false;
  if (!user.image) return false;
  if (!user.email) return false;
  return true;
}
