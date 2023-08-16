import { component$, useStore } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { ChannelType } from "discord-api-types/v10";
import {
  Add,
  Remove,
} from "qwik-ionicons";
import { MenuTitle } from "~/components/Menu";
import { Button } from "~/components/elements/Button";
import Card, { CardHeader } from "~/components/elements/Card";
import SelectInput from "~/components/elements/SelectInput";
import SettingsMenu from "~/components/elements/SettingsMenu";
import TextInput from "~/components/elements/TextInput";
import type { guildData } from "~/components/functions/guildData";
import { updateSettingFn } from "~/components/functions/guildData";
import { useGetGuildData, useGetUserData } from "~/routes/layout-required";

export default component$(() => {
  const guildData = useGetGuildData().value;
  const userData = useGetUserData().value;
  const store = useStore({
    guildData,
    userData,
    loading: [] as string[],
  });

  if (store.guildData instanceof Error) {
    return (
      <div class="flex flex-col gap-3 items-center justify-center h-full pt-24">
        <h1 class="text-4xl font-bold">Error</h1>
        <p class="text-xl">{(guildData as Error).message}</p>
        <Button onClick$={() => location.reload()} color="danger">
          Reload
        </Button>
      </div>
    );
  }

  if (store.userData instanceof Error) {
    return (
      <div class="flex flex-col gap-3 items-center justify-center h-full pt-24">
        <h1 class="text-4xl font-bold">Error</h1>
        <p class="text-xl">{(userData as Error).message}</p>
        <Button onClick$={() => location.reload()} color="danger">
          Reload
        </Button>
      </div>
    );
  }

  const { guild, channels, srvconfig } = store.guildData as guildData;

  return (
    <section class="grid gap-4 grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 mx-auto max-w-screen-2xl px-4 sm:px-6 min-h-[calc(100lvh-80px)]">
      <SettingsMenu guild={guild} store={store} />
      <div class="sm:col-span-2 lg:col-span-3 2x1:col-span-4 pt22 sm:pt-28">
        <MenuTitle>Join/Leave Image Settings</MenuTitle>
        <div class="flex flex-wrap gap-4 py-10">
          <Card fit>
            <CardHeader id="joinmessage" loading={store.loading.includes("joinmessage")}>
              <Add width="25" class="fill-current" /> Join Message
            </CardHeader>
            <TextInput big id="joinmessage-message" value={srvconfig?.joinmessage.message} placeholder="The message sent when someone joins the server" onChange$={async (event: any) => {
              store.loading.push("joinmessage");
              srvconfig!.joinmessage.message = event.target.value;
              await updateSettingFn("joinmessage", JSON.stringify(srvconfig?.joinmessage));
              store.loading = store.loading.filter((l) => l != "joinmessage");
            }}
            >
              The message when someone joins the server
            </TextInput>
            <p class="mt-2 mb-4">
              Possible placeholders: <code>{"{USER MENTION}"}</code> <code>{"{USERNAME}"}</code> <code>{"{SERVER NAME}"}</code> <code>{"{NUMBER}"}</code> <code>{"{NUMBER FORMATTED}"}</code>
            </p>
            <SelectInput id="joinmessage-channel" label="Channel to send the message in" onChange$={async (event: any) => {
              store.loading.push("joinmessage");
              srvconfig!.joinmessage.channel = event.target.value;
              await updateSettingFn("joinmessage", JSON.stringify(srvconfig?.joinmessage));
              store.loading = store.loading.filter((l) => l != "joinmessage");
            }}
            >
              <option value="false" selected={srvconfig?.joinmessage.channel == "false"}> System Channel </option>
              {channels
                .filter((c) => c.type == ChannelType.GuildText).map((c) => (
                  <option value={c.id} key={c.id} selected={srvconfig?.joinmessage.channel == c.id}>{`# ${c.name}`}</option>
                ))}
            </SelectInput>
          </Card>
          <Card fit>
            <CardHeader id="leavemessage" loading={store.loading.includes("leavemessage")}>
              <Remove width="25" class="fill-current" /> Leave Message
            </CardHeader>
            <TextInput big id="leavemessage-message" value={srvconfig?.leavemessage.message} placeholder="The message sent when someone leaves the server" onChange$={async (event: any) => {
              store.loading.push("leavemessage");
              srvconfig!.leavemessage.message = event.target.value;
              await updateSettingFn("leavemessage", JSON.stringify(srvconfig?.leavemessage));
              store.loading = store.loading.filter((l) => l != "leavemessage");
            }}
            >
              The message when someone leaves the server
            </TextInput>
            <p class="mt-2 mb-4">
              Possible placeholders: <code>{"{USER MENTION}"}</code> <code>{"{USERNAME}"}</code> <code>{"{SERVER NAME}"}</code> <code>{"{NUMBER}"}</code> <code>{"{NUMBER FORMATTED}"}</code>
            </p>
            <SelectInput id="leavemessage-channel" label="Channel to send the message in" onChange$={async (event: any) => {
              store.loading.push("leavemessage");
              srvconfig!.leavemessage.channel = event.target.value;
              await updateSettingFn("leavemessage", JSON.stringify(srvconfig?.leavemessage));
              store.loading = store.loading.filter((l) => l != "leavemessage");
            }}
            >
              <option value="false" selected={srvconfig?.leavemessage.channel == "false"}> System Channel </option>
              {channels
                .filter((c) => c.type == ChannelType.GuildText).map((c) => (
                  <option value={c.id} key={c.id} selected={srvconfig?.leavemessage.channel == c.id}>{`# ${c.name}`}</option>
                ))}
            </SelectInput>
          </Card>
        </div>
      </div>
    </section>
  );
});

export const head: DocumentHead = {
  title: "Join/Leave Settings",
  meta: [
    {
      name: "description",
      content: "Lumin Join/Leave Settings",
    },
    {
      property: "og:description",
      content: "Lumin Join/Leave Settings",
    },
  ],
};