import {
  Select,
  SelectItem,
  Tab,
  TabList,
  Tabs,
} from '@myshell-run/react-aria-tailwind-starter';
import { cn } from '@myshell-run/ui-primitives';
import { FormHeader } from './lui-form';

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
        <div className="mb-spacing-lg">
          <label className="body-lg-regular mb-[8px] inline-block">
            Your Speaking Language
          </label>
          <Select placeholder="Mixed Language">
            <SelectItem>Chocolate</SelectItem>
            <SelectItem id="mint">Mint</SelectItem>
            <SelectItem>Strawberry</SelectItem>
            <SelectItem>Vanilla</SelectItem>
          </Select>
        </div>
        <div className="mb-spacing-lg">
          <label className="body-lg-regular mb-[8px] inline-block">
            Audio Speed
          </label>
          <ButtonGroup />
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

const ButtonGroup = () => {
  return (
    <Tabs selectedKey="1">
      <TabList
        aria-label="Audio Speed"
        className="justify-between rounded-full border border-border-bolder-light bg-surface-container-default-light"
      >
        {[0.5, 0.75, 1, 1.25, 1.5].map((speed) => (
          <Tab
            id={speed.toString()}
            className={cn(
              'flex-1 justify-center',
              speed === 1 &&
                'border border-border-default-light bg-surface-default-light text-text-brand-light',
            )}
          >
            {speed}
          </Tab>
        ))}
      </TabList>
    </Tabs>
  );
};
