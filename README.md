![GQBANNER](https://user-images.githubusercontent.com/114195647/218575946-a91b1e73-d29d-40b9-9ae9-f35b0f475411.png)
# GitQuest!

GitQuest is a Slack app integration that gamifies your GitHub activity from a selected repository.

## Installation
To install you'll first need to add the app to your slack workspace by clicking the add to slack button on our website after providing your email. 

Follow the numbered buttons provided to the admin of your organization who installed the app to the Slack workspace.

1. Provide your Organization name exactly as it appears on github (eg. ```GitQuest-Huzzah```).

2. Authorize our app thru GitHub.

3. Link any repos you'd like us track activity on for you. Please choose as many as you'd like. Later if you decide to stop tracking certain repos feel free to use the ```Unfollow Repos``` button.

4. Link your workspaces users and to their GitHub usernames (don't worry this can be changed at any time in the future).

5. Experience the Adventure! 

## Usage

### Quests
•Once the workspace administrator has followed all the installation instructions your team will be ready to commit to the quest!

•Your workspace administrator can create quests, much like a typical ticket to allow a specific amount of gold and xp to bestow upon completion. Quests have a description to cover any and all issues the quest should address, a name to identify it, and MOST importantly a ```keyword``` which will need to be provided as the first word of your pull request subject. The pull request subject is populated automatically from your commit message. This is how we make sure a pull request is referencing a specific quest, so make sure you do it right! However, if you forget, your admin can still complete a quest for you. Just be aware you won't get credit for your pull request or the commits, only the value for the quest itself. Below is an example if the quest keyword were ```bugchase```(note: keywords are NOT case sensitive)
![image](https://user-images.githubusercontent.com/114195647/218576962-9071803e-a919-41fd-8eee-0dcde2be92fb.png)

•You can simply claim a quest(or several!) by using the ```Available Quests``` button on the app home screen in Slack.

•You can view your currently active claimed quests in the ```Quest Log``` on the app home screen in Slack. From ```Quest Log``` you are also able to drop a quest if for some reason you no longer will be resolving this issue and would like to let another adventurer claim it. 

•As an admin for the workspace you can view ```Quest Activity``` over the last 7 days incrementally as well using the ```Quest Activity``` button on the app home screen in Slack.

### XP, Gold, and Reward Gold

•XP is earned on every commit attached to a pull request. If a pull request is processed with your user name with 3 commits you will receive XP for 3 commits and 1 pull request. Commits are only counted upon a pull request being created.

•You can also earn XP and Gold from quests created by your workspace administrator.

•As you play you'll receive gold upon each new level.

•You are able to freely reward your fellow adventurers if you choose to by clicking ```Reward Gold``` on the app home screen on Slack. Throughout your participation you are given reward gold which is explicitly used to show recognition for your fellow adventurers who may have helped you with an issue or may just be a great coworker. 

•You can view your current gold, xp, and reward gold by clicking the ```My Profile``` on the app home screen in Slack.

•A log explaining the source of all your gold is found by clicking the ```Gold Log``` button. This will show you gold earned from quests
