import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import {
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
  type Ref,
} from "react";
import type {
  CreateMemberFormData,
  UpdateMemberFormData,
} from "./member.schema";

export type FormRef = {
  submitForm: () => void;
};

interface MemberFormProps<
  T extends CreateMemberFormData | UpdateMemberFormData
> {
  ref?: Ref<FormRef>;
  initialData: T;
  onFormSubmit: (data: T) => void;
  isLoading: boolean;
  showPasswordField?: boolean;
}

export default function MemberForm<
  T extends CreateMemberFormData | UpdateMemberFormData
>({ ref, initialData, onFormSubmit }: MemberFormProps<T>) {
  const [formData, setFormData] = useState<T>(initialData);
  const formRef = useRef<HTMLFormElement>(null);

  useImperativeHandle(ref, () => ({
    submitForm() {
      if (formRef.current) {
        formRef.current.requestSubmit();
      }
    },
  }));

  useEffect(() => {
    setFormData(initialData);
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    console.log(name, value);
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    onFormSubmit(formData);
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit} ref={formRef}>
      <div className="flex flex-col gap-3">
        <Label htmlFor="first-name">First Name</Label>
        <Input
          id="first-name"
          name="firstName"
          defaultValue={formData.firstName}
          autoFocus
          onChange={handleChange}
        />
      </div>
      <div className="flex flex-col gap-3">
        <Label htmlFor="last-name">Last Name</Label>
        <Input
          id="last-name"
          name="lastName"
          defaultValue={formData.lastName}
          onChange={handleChange}
        />
      </div>
      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-3">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            defaultValue={formData.email}
            type="email"
            onChange={handleChange}
          />
        </div>
      </div>
    </form>
  );
}
