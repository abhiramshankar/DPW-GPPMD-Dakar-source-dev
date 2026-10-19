import { DefaultButton } from "@fluentui/react/lib/components/Button/DefaultButton/DefaultButton";
import { IContextualMenuProps } from "@fluentui/react/lib/components/ContextualMenu/ContextualMenu.types";

export type TActionButtonOptions = {
  text: string;
  onClick: (val?: any) => void;
  disabled?: boolean;
};

interface IActionButtonProps {
  options: TActionButtonOptions[];
}

export default function ActionButton({ options }: IActionButtonProps) {
  const menuProps: IContextualMenuProps = {
    // first make sure optins is filtered to remove index item 0
    items: options
      .filter((n, index) => index !== 0)
      .map((option, index) => {
        return {
          key: option.text,
          text: option.text,
          onClick: option.onClick,
          disabled: option.disabled ?? false,
        };
      }),
    directionalHintFixed: true,
  };
  console.log(options, menuProps);
  return (
    <>
      {options.length >= 1 && (
        <DefaultButton
          key={options[0].text}
          text={options[0].text}
          primary
          split={menuProps.items.length > 0}
          onClick={options[0].onClick}
          menuProps={menuProps.items.length > 0 ? menuProps : undefined}
          disabled={options[0].disabled ?? false}
        />
      )}
    </>
  );
}
