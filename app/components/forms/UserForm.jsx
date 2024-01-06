import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";

const UserForm = ({
  submit,
  isLoadingNewUser,
  isLoadingUser,
  isEditing,
  initialValue,
}) => {
  const { register, handleSubmit } = useForm({ defaultValues: initialValue });

  // fetch roles
  const { data: dataRoles, isLoading: isLoadingRoles } = useQuery({
    queryKey: ["roles"],
    queryFn: async () => {
      const response = await axios.get("/api/roles");
      return response.data;
    },
  });

  // fetch staus'
  const { data: dataStatuses, isLoading: isLoadingStatuses } = useQuery({
    queryKey: ["statuses"],
    queryFn: async () => {
      const response = await axios.get("/api/statuses");
      return response.data;
    },
  });

  return (
    <form
      onSubmit={handleSubmit(submit)}
      className="flex flex-col items-center justify-center gap-5 mt-10"
    >
      <input
        type="text"
        {...register("name", { required: true })}
        placeholder="Name"
        className="w-full max-w-lg input input-bordered"
      />
      <input
        type="email"
        {...register("email", { required: true })}
        placeholder="Email"
        className="w-full max-w-lg input input-bordered"
      />
      <input
        type="text"
        {...register("username", { required: true })}
        placeholder="Username"
        className="w-full max-w-lg input input-bordered"
      />
      {isLoadingRoles ? (
        <span className="loading loading-infinity loading-md"></span>
      ) : (
        <select
          {...register("roleId", { required: true })}
          className="w-full max-w-lg select select-bordered"
          defaultValue={""}
        >
          <option disabled value="">
            Select Role
          </option>
          {dataRoles?.map((role) => (
            <option key={role.id} value={role.id}>
              {role.name}
            </option>
          ))}
        </select>
      )}
      {isLoadingStatuses ? (
        <span className="loading loading-infinity loading-md"></span>
      ) : (
        <select
          {...register("statusId", { required: true })}
          className="w-full max-w-lg select select-bordered"
          defaultValue={""}
        >
          <option disabled value="">
            Select Status
          </option>
          {dataStatuses?.map((status) => (
            <option key={status.id} value={status.id}>
              {status.name}
            </option>
          ))}
        </select>
      )}
      <button
        type="submit"
        className="w-full max-w-lg text-xl border shadow-md btn shadow-black"
      >
        {isEditing
          ? isLoadingUser
            ? "Updating.."
            : "Update"
          : isLoadingNewUser
          ? "Creating.."
          : "Create"}
      </button>
    </form>
  );
};

export default UserForm;
