const config = {
  environment: process.env.NODE_ENV || "dev",
  server: {
    port: process.env.PORT || 4000
  },
  mongo: {
    url: process.env.MONGO_DB_URI || "mongodb://localhost/backend"
  },
  admin_account: {
    firstName: "Admin",
    lastName: "",
    email: "admin@admin.nu",
    password: process.env.ADMIN_PASSWORD || "admin",
    role: "ADMIN"
  },
  companies: [
    {
      name: "Philips",
      reps: 3,
      productsPerCategory: 3,
      categories: ["TV", "VCR"],
      materialsPerProduct: 3
    },
    {
      name: "Samsung",
      reps: 2,
      productsPerCategory: 5,
      categories: ["TV", "VCR", "Mobile Phone"],
      materialsPerProduct: 2
    }
  ],
  threads: [
    {
      question: "How to configure the flux capasitor in a Samsung 420?"
    },
    {
      question: "      Philips VCR won't play DVD????      "
    },
    {
      question: "TV does not respond to remote"
    },
    {
      question: "About samsung star s5233?\n"
    },
    {
      question: "What is better sony tablet or samsung galaxy note?\n"
    },
    {
      question: "What is samsung lfd monitors ?\n"
    }
  ],
  posts: [
    {
      text: 'So you would THINK it\'s reliable overall..... \n' +
      '\n' +
      'BUT if the general population ISN\'T buying PHILLIPS....then that really throws the percentages off..... \n' +
      '\n' +
      'BUT I DO KNOW ONE THING.....WHEN a really Great TV is being made, you can sit outside the store and see one BRAND/MODEL coming out the door one after another.... \n' +
      '\n' +
      'And when SONY developed the VVEGA flat screen tv....that\'s all ANYONE was buying...... \n' +
      '\n' +
      'Got an hour or two? \n' +
      'If not, DECIDE what you WANT your TV to do, get a list together of your desires, list them from HIGHEST to LOWEST priority and hand the sheet to a salesman.....he can show you what fits...... \n' +
      'Just make sure you buy a KNOWN brand name over a NEW brand name.....'
    },
    {
      text: 'Philips used to be the best, but what happened, like most of the rest of the companies, is that they have their products made in Communist China to save money. For many years we have been going downhill in the quality of electronic products. The days of research and testing are over. That costs too much money. Now they just slap it on the market and see how many people scream when they break prematurely. We went from American quality to Japanese miniaturization to Malaysia,Mexico,Philippines,Korea, and now the ones who will work the cheapest,Communist China. I am sure they stay up all night worrying about how long our TVs are going to last. Well we wanted cheap products and that\'s exactly what we got. After all who wants to pay an extra ten dollars for a quality American-made product? Evidently not us we forced all of them out of business. So the Netherland -based company Philips is no worse than the others today. They are so big that you see a lot of complaints because they sell a lot of products worldwide. Philips recently lowered their amount of money that they pay their servicenters and now a lot of them refuse to work on their products at this reduced rate. After all the Chinese don\'t demand so much money. Who do we think we are anyway! Americans?\n'
    },
    {
      text: 'I found 32" philips for $360 at target while Sony and Samsung were above $400 \n' +
      'I thought Sony is the best 4 TVs but Samsung was more expensive! \n' +
      '\n' +
      'what do u think? and what features should I look 4? like HDMI and USB ...'
    },
    {
      text: 'I was considering Philips 32 inch pfl4556 and samsung eh5000.Both are full HD and 32 inches.Philips comes with 3d combifilter and extra VGA connection to PC.Also Philips is cheaper at Rs30,000 whereas samsung is 34,500.Which of the two has better picture quality.Please help me choose in between the... show more\n'
    },
    {
      text: "Samsung Star S5233 is very good phone. Its a nice phone with latest features. Worth buying it. \n" +
      "\n" +
      "More Details: \n" +
      "Samsung Star S5233 mobile comes with the latest multimedia features in a slim and compact body that measures a mere 11.9mm. It also comes with a stylus for convenience. Other features include: \n" +
      "\n" +
      "* a 3.0-inch WQVGA full-touch screen and Samsung's TouchWiz User Interface with Mobile Widgets and an accelerometer sensor \n" +
      "* \"Photo Contact,\" to call a contact by touching an appointed image. \n" +
      "* 3.2 mega-pixel camera with smile recognition \n" +
      "* multi-format playback and Samsung's DNSe sound engine \n" +
      "* recognition using Shazam's \"Find Music\" service \n" +
      "* 50MB Internal memory, expandable up to 8GB via microSD cards \n" +
      "* Google applications like Google Search, Gmail, Google maps; online widgets and photo blogging \n" +
      "\n" +
      "Gesture Control is a new feature added that allows the user to unlock the touch screen or run an application by just giving a gesture command. For example - to call a friend, you don't need to search his/her number in the contacts list, just give a gesture command (A, B or C as per your preference and setting) - the phone will recognize the command and dial the number. In addition, the user can also customize various applications like C- Call, M – Music, I – Internet etc.The phone also supports a virtual QWERTY keyboard for messaging and handwriting features. "
    },
    {
      text: "\n" +
      "It depends on your requirement vinod ....if you will be using your mobile for internet,video conference ,downloads etc.(Like 3G dependent services) ..I would personally recommend you to GO for N70.... but if you are gong to use this phone for any other purpose you can go straight away to Samsung star,which has a pretty good specs when compared to N70 (like a 3MP camera , TOUCHSCREEN )"
    }
  ]

};

module.exports = config;
