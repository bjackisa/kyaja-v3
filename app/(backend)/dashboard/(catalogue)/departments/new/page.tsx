import FormHeader from "@/components/back-end/FormHeader";
import NewDepartmentsForm from "@/components/form-inputs/NewDepartmentsForm";

export default async function NewCategory() {
  return (
    <div>
      <FormHeader title="New Departments" />
      <NewDepartmentsForm />
    </div>
  );
}
