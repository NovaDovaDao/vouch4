import { TextInput, TextInputProps } from "react-native";

export function ThemedTextInput(props: TextInputProps) {
  const classNames = [
    "border border-neutral-300 rounded-full px-4 h-12 text-xl",
    "dark:border-neutral-700 dark:text-neutral-300",
  ];
  if (props.className) {
    classNames.push(props.className);
  }
  return <TextInput {...props} className={classNames.join(" ")} />;
}
