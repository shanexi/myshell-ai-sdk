import { FormHeader } from './lui-form';
import {
  Button,
  Label,
  ListBox,
  ListBoxItem,
  Popover,
  Select,
  SelectValue,
} from 'react-aria-components';

export const ChatSettings = () => {
  return (
    <div>
      <FormHeader>
        <div className="special-20 text-text-default-light">Chat Settings</div>
      </FormHeader>
      <div className="bg-surface-default-light px-spacing-2xl py-spacing-lg">
        <FormItem label="Audio">
          <Toggle checked={true} />
        </FormItem>
        <FormItem label="Audio Autoplay">
          <Toggle checked={false} />
        </FormItem>
        <FormItem label="Transcription">
          <Toggle checked={true} />
        </FormItem>
        <FormItem label="Translation">
          <Toggle checked={true} />
        </FormItem>
        <hr className="mb-spacing-lg border-border-default-light" />
        <div>
          <label className="body-lg-regular mb-[8px]">
            Your Speaking Language
          </label>
          <Select>
            <Label>Favorite Animal</Label>
            <Button>
              <SelectValue />
              <span aria-hidden="true">▼</span>
            </Button>
            <Popover>
              <ListBox>
                <ListBoxItem>Aardvark</ListBoxItem>
                <ListBoxItem>Cat</ListBoxItem>
                <ListBoxItem>Dog</ListBoxItem>
                <ListBoxItem>Kangaroo</ListBoxItem>
                <ListBoxItem>Panda</ListBoxItem>
                <ListBoxItem>Snake</ListBoxItem>
              </ListBox>
            </Popover>
          </Select>
        </div>
      </div>
    </div>
  );
};

const FormItem = (props: { label: string; children: React.ReactNode }) => {
  const { label, children } = props;
  return (
    <div className="mb-spacing-lg flex justify-between">
      <label className="body-lg-regular">{label}</label>
      {children}
    </div>
  );
};

const Toggle = (props: { checked: boolean }) => {
  const { checked } = props;
  return (
    <input
      type="checkbox"
      defaultChecked={checked}
      className="toggle rounded-full border-none bg-[#e5e7eb] p-[2px] text-surface-default-light shadow-none before:rounded-full before:shadow-none checked:border-text-brand-light checked:bg-text-brand-light"
    />
  );
};
