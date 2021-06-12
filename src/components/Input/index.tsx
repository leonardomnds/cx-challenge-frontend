import React, {
  useState, useRef, useCallback, InputHTMLAttributes,
} from 'react';
import { IconBaseProps } from 'react-icons';

import { Container } from './styles';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ComponentType<IconBaseProps>;
  placeholder: string;
  value: string;
  setValue: (v: any) => void;
}

const CustomInput: React.FC<InputProps> = ({
  placeholder, value, setValue, icon: Icon, ...rest
}: InputProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const [isFocused, setFocused] = useState(false);

  const handleContainerFocus = useCallback(() => {
    inputRef.current?.focus();
  }, []);

  const onChangeValue = useCallback(() => {
    setValue(inputRef.current?.value || '');
  }, [setValue]);

  return (
    <Container
      isFocused={isFocused}
      onClick={handleContainerFocus}
    >
      { Icon && <Icon size={20} />}
      <input
        required
        value={value}
        onChange={onChangeValue}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        ref={inputRef}
        {...rest}
      />
      <span>{placeholder}</span>
    </Container>
  );
};

export default CustomInput;
