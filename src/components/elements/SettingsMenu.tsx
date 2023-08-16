import { component$ } from '@builder.io/qwik';
import { FolderOutline, At, PersonAdd, PersonRemove } from 'qwik-ionicons';
import Menu, { MenuCategory, MenuItem } from '../Menu';

export default component$(({ guild, store }: any) => {
  return (
  <Menu guild={guild} store={store}>
    <MenuCategory name="General">
      <MenuItem guild={guild} href="general/#membercount">
        <FolderOutline width="25" class="fill-current" /> Member Count Channel
      </MenuItem>
      <MenuItem guild={guild} href="general/#counting">
        <FolderOutline width="25" class="fill-current" /> Counting Channel
      </MenuItem>
      <MenuItem guild={guild} href="general/#staffrole">
        <At width="25" class="fill-current" /> Staff Role
      </MenuItem>
    </MenuCategory>
    <MenuCategory  name="Join/Leave">
      <MenuItem guild={guild} href="joinleave/#joinmessage">
        <PersonAdd width="25" class="fill-current" /> Join Message
      </MenuItem>
      <MenuItem guild={guild} href="joinleave/#leavemessage">
        <PersonRemove width="25" class="fill-current" /> Leave Message
      </MenuItem>
    </MenuCategory>
    {/* <MenuCategory  name="Levels">
      <MenuItem guild={guild} href="levels/leaderboard">
        <PeopleCircle width="25" class="fill-current" /> Leaderboard
      </MenuItem>
      <MenuItem guild={guild} href="levels/#levelrewards">
        <PeopleCircle width="25" class="fill-current" /> Level Rewards
      </MenuItem>
    </MenuCategory> */}
    <MenuCategory name="More Coming Soon!" />
  </Menu>
  )
});