import { FormDataType } from "../page";

export const formSubmit = async (data: FormDataType) => {
  if (!data.age || !data.file || !data.date) return;

  const formData = new FormData();
  formData.append("firstName", data.firstName);
  formData.append("lastName", data.lastName);
  formData.append("email", data.email);
  formData.append("age", data.age.toString());
  formData.append("file", data.file);
  formData.append("date", data.date.toString());
  formData.append("time", data.time);

  const response = await fetch("http://letsworkout.pl/submit", {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    return { success: false };
  }

  const responseData = await response.json();

  return { success: true, data: responseData };
};
