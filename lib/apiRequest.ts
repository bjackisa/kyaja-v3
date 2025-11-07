import toast from "react-hot-toast";

type SetLoadingFunction = (loading: boolean) => void;
type ResetFunction = () => void;
type RedirectFunction = () => void;

// Generic type for the request data
interface PostPutRequestData {
  [key: string]: unknown; // Replace `any` with `unknown` for better type safety
}

export async function makePostRequest<T extends PostPutRequestData>(
  setLoading: SetLoadingFunction,
  endpoint: string,
  data: T,
  resourceName: string,
  reset: ResetFunction,
  redirect: RedirectFunction
): Promise<void> {
  try {
    setLoading(true);
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

    const response = await fetch(`${baseUrl}/${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const responseData = await response.json();

    if (response.ok) {
      setLoading(false);
      toast.success(`New ${resourceName} Created Successfully`);
      reset();
      redirect();
    } else {
      setLoading(false);
      if (response.status === 409) {
        toast.error(`${responseData.message}`);
      } else {
        toast.error("Something Went wrong, Please Try Again");
      }
    }
  } catch (error) {
    setLoading(false);
    console.log(error);
  }
}

export async function makePutRequest<T extends PostPutRequestData>(
  setLoading: SetLoadingFunction,
  endpoint: string,
  data: T,
  resourceName: string,
  redirect: RedirectFunction
): Promise<void> {
  try {
    setLoading(true);
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

    const response = await fetch(`${baseUrl}/${endpoint}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      setLoading(false);
      toast.success(`${resourceName} Updated Successfully`);
      redirect();
    } else {
      setLoading(false);
      toast.error("Something Went wrong");
    }
  } catch (error) {
    setLoading(false);
    console.log(error);
  }
}
