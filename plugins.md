---
title: Plugins
layout: template
filename: plugins
---

## Plugins
This page will help you understand how to use and configure plugins.

## Contents
* [Alternate Account Identifier](#alternate-account-identifier)
* [Anti Guild Invites](#anti-guild-invites)
* [Anti Phishing Links](#anti-phishing-links)
* [Anti Raid](#anti-raid)
* [Anti Spam](#anti-spam)
* [Automatic Decancer](#automatic-decancer)
* [Blacklisted Words](#blacklisted-words)
* [Family Friendly Content](#family-friendly-content)
* [Leveling System](#leveling-system)
* [Lockdown Channel System](#lockdown-channel-system)
* [Mute Role](#mute-role)
* [Verification System](#verification-system)

#### Alternate Account Identifier
This feature blocks out alternate accounts from your guild.

You can configure the alt-identifier plugin with the slash command called ``/alt-identifier``. This slash command has a series of subcommands. You can see these subcommands in the table below.

Permissions required: ``ADMINISTRATOR`` <br>
Command cooldown: ``1 minute``

| Name | Description | Usage
| :--- | :--- | :--- 
| On | Turns the alt-identifier plugin on. | `/alt-identifier On {channel} {time}` 
| Off | Turns the alt-identifier plugin off. | `/alt-identifier Off` 

---

#### Anti Guild Invites
This feature purges the server of invites for other guilds.

You can configure the anti-invite plugin with the slash command called ``/anti-invite``. This slash command has a series of subcommands. You can see these subcommands in the table below.

Permissions required: ``ADMINISTRATOR`` <br>
Command cooldown: ``1 minute``

| Name | Description | Usage
| :--- | :--- | :--- 
| On | Turns the anti-invite plugin on. | `/anti-invite On` 
| Off | Turns the anti-invite plugin off. | `/anti-invite Off` 

---

#### Anti Phishing Links
This feature deletes malicious links that are posted on your server.

You can configure the anti-phish plugin with the slash command called ``/anti-phish``. This slash command has a series of subcommands. You can see these subcommands in the table below.

Permissions required: ``ADMINISTRATOR`` <br>
Command cooldown: ``1 minute``

| Name | Description | Usage
| :--- | :--- | :--- 
| On | Turns the anti-phish plugin on. | `/anti-phish On` 
| Off | Turns the anti-phish plugin off. | `/anti-phish Off`

---

#### Anti Raid
This feature prevents members in your guild from spamming @everyone and @here.

You can configure the anti-raid plugin with the slash command called ``/anti-raid``. This slash command has a series of subcommands. You can see these subcommands in the table below.

Permissions required: ``ADMINISTRATOR`` <br>
Command cooldown: ``1 minute``

| Name | Description | Usage
| :--- | :--- | :--- 
| On | Turns the anti-raid plugin on. | `/anti-raid On` 
| Off | Turns the anti-raid plugin off. | `/anti-raid Off`

---

#### Anti Spam
This feature prevents members in your guild from spamming text.

You can configure the anti-spam plugin with the slash command called ``/anti-spam``. This slash command has a series of subcommands. You can see these subcommands in the table below.

Permissions required: ``ADMINISTRATOR`` <br>
Command cooldown: ``1 minute``

| Name | Description | Usage
| :--- | :--- | :--- 
| On | Turns the anti-spam plugin on. | `/anti-spam On` 
| Off | Turns the anti-spam plugin off. | `/anti-spam Off`

---

#### Automatic Decancer
This feature will automatically convert usernames that contain cancerous text to normal usernames.

You can configure the auto-decancer plugin with the slash command called ``/auto-decancer``. This slash command has a series of subcommands. You can see these subcommands in the table below.

Permissions required: ``ADMINISTRATOR`` <br>
Command cooldown: ``1 minute``

| Name | Description | Usage
| :--- | :--- | :--- 
| On | Turns the auto-decancer plugin on. | `/auto-decancer On` 
| Off | Turns the auto-decancer plugin off. | `/auto-decancer Off`

---

#### Blacklisted Words
This feature will automatically delete messages containing text that the guild has blacklisted.

You can configure the blacklisted-words plugin with the slash command called ``/blacklisted-words``. This slash command has a series of subcommands. You can see these subcommands in the table below.

Permissions required: ``ADMINISTRATOR`` <br>
Command cooldown: ``1 minute``

| Name | Description | Usage
| :--- | :--- | :--- 
| Add | Adds a blacklisted word. | `/blacklisted-words Add {word}`
| Remove | Removes a blacklisted word. | `/blacklisted-words Remove {word}` 
| Delete | Deletes the blacklisted words. | `/blacklisted-words Delete`
| Display | Displays the blacklisted words. | `/blacklisted-words Display` 
| Punishment | Sets the punishment for saying the blacklisted words. | `/blacklisted-words Punishment` 

---

#### Family Friendly Content
This feature will automatically delete words that contain bad words.

You can configure the family-friendly plugin with the slash command called ``/family-friendly``. This slash command has a series of subcommands. You can see these subcommands in the table below.

Permissions required: ``ADMINISTRATOR`` <br>
Command cooldown: ``1 minute``

| Name | Description | Usage
| :--- | :--- | :--- 
| On | Turns the family-friendly plugin on. | `/family-friendly On` 
| Off | Turns the family-friendly plugin off. | `/family-friendly Off`

---

#### Leveling System
This feature will allow members to gain experience points while sending messages.

You can configure the leveling plugin with the slash command called ``/leveling``. This slash command has a series of subcommands. You can see these subcommands in the table below.

Permissions required: ``ADMINISTRATOR`` <br>
Command cooldown: ``1 minute``

| Name | Description | Usage
| :--- | :--- | :--- 
| On | Turns the leveling system plugin on. | `/leveling On` 
| Off | Turns the leveling system plugin off. | `/leveling Off`

---

#### Lockdown Channel System
This feature locks down specific channels.

You can configure the lockdown-channels plugin with the slash command called ``/lockdown-channels``. This slash command has a series of subcommands. You can see these subcommands in the table below.

Permissions required: ``ADMINISTRATOR`` <br>
Command cooldown: ``1 minute``

| Name | Description | Usage
| :--- | :--- | :--- 
| Add | Adds a lockdown channel. | `/lockdown-channels Add {channel}`
| Remove | Removes a lockdown channel. | `/lockdown-channels Remove {channel}` 
| Delete | Deletes the lockdown channels. | `/lockdown-channels Delete`
| Display | Displays the lockdown channels. | `/lockdown-channels Display` 

---

#### Mute Role
This feature configures the mute role.

You can configure the mute-role plugin with the slash command called ``/mute-role``. This slash command has a series of subcommands. You can see these subcommands in the table below.

Permissions required: ``ADMINISTRATOR`` <br>
Command cooldown: ``1 minute``

| Name | Description | Usage
| :--- | :--- | :--- 
| Create | Creates a mute-role. | `/mute-role Create`
| Set | Sets a mute-role. | `/mute-role Set {role}` 
| Delete | Deletes the mute-role. | `/mute-role Delete`

---

#### Verification System
This feature prevents user-botted accounts from entering your guild.

You can configure the verification plugin with the slash command called ``/verification``. This slash command has a series of subcommands. You can see these subcommands in the table below.

Permissions required: ``ADMINISTRATOR`` <br>
Command cooldown: ``1 minute``

| Name | Description | Usage
| :--- | :--- | :--- 
| On | Turns the verification plugin on. | `/verification On` 
| Off | Turns the verification plugin off. | `/verification Off`
