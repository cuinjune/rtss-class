# Week3

## Assignment

At this point, you have an environment. One of our goals for the next few weeks is to better understand how to create the type of experience that you want to foster,   whether that  is an intimate performance experience, a playful gaming experience, a meditative group experience or something else entirely.  With this in mind, please change some aspect of how people interact with each other within your environment.  This could be a technical change (i.e. implement a new set of three.js controls, create your own set of controls, etc.) or a change in the on-boarding / guidance around your project (i.e. ask participants to tell a specific story to one another or otherwise create a "guided" experience).  Test your change out with a few people (see note below on NGROK) and write about how this change / test went on your blog.

## What I did

I decided to add a playful gaming experience on top of [Battle Square](https://github.com/cuinjune/battle-square). I tried to allow each player to hit each other by left/right clicking the mouse.

I found a simple solution to do this:

```
const box1 = new THREE.Box3().setFromObject(object1);
const box2 = new THREE.Box3().setFromObject(object2);

if (box1.intersectsBox(box2)) {
    console.log("Collision Detected!")
}

```

However, I could not figure out what data to send to the server because I cannot just send the three.js object to the node.js server. I believe I need to convert objects to plain arrays of values. Maybe I should send both position and quaternion values of objects to the server and then later reconstruct objects using these data so I can detect collision between the player and clients. I will need to spend more time working on this.

