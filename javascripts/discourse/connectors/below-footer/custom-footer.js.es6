// Used instead of dasherize for backwards compatibility with stable
import { withPluginApi } from "discourse/lib/plugin-api";

const getClassName = text => {
  return text.toLowerCase().replace(/\s/g, "-");
};

export default {
  setupComponent(args, component, api) {
    // console.log(component._currentState)

    withPluginApi("0.8", (api) => {
      api.onPageChange((url) => {
        try {
          
            //showFooterOnStatic() {
              // this.set("application.showFooter", true);
            //}
            // alert('kkk');
            
          
          /*
          component.set('actions', {})
          component.set('actions.myAction', () => { 
            alert('my action triggered') 
          });
          */
          component.set('actions.createAccount', () => {
            this.appEvents.trigger('showCreateAccount');
          });

          const splitLinkSections = settings.Link_sections.split("|").filter(Boolean);
          const splitLinks = settings.Links.split("|").filter(Boolean);
          const splitSmallLinks = settings.Small_links.split("|").filter(Boolean);
          const splitSocialLinks = settings.Social_links.split("|").filter(Boolean);

          const linkArray = [];
          const sectionsArray = [];
          const smallLinksArray = [];
          const socialLinksArray = [];

          splitLinks.forEach(link => {
            const fragments = link.split(",").map(fragment => fragment.trim());
            const parent = fragments[0].toLowerCase();
            const text = fragments[1];
            const className = getClassName(text);
            const href = fragments[2];
            const target = fragments[3] === "blank" ? "_blank" : "";
            const title = fragments[4];

            const linkItem = {
              parent,
              text,
              className,
              href,
              target,
              title
            };
            linkArray.push(linkItem);
          });

          splitLinkSections.forEach(section => {
            const fragments = section.split(",").map(fragment => fragment.trim());
            const parentFor = fragments[0].toLowerCase();
            const text = fragments[0];
            const className = getClassName(text);
            const title = fragments[1];
            const childLinks = linkArray.filter(link => link.parent === parentFor);

            const listItem = {
              text,
              className,
              childLinks
            };
            sectionsArray.push(listItem);
          });

          splitSocialLinks.forEach(link => {
            const fragments = link.split(",").map(fragment => fragment.trim());
            const text = fragments[0];
            const className = getClassName(text);
            const title = fragments[1];
            const href = fragments[2];
            const target = fragments[3] === "blank" ? "_blank" : "";
            const icon = fragments[4].toLowerCase();

            const socialLinkItem = {
              text,
              className,
              title,
              href,
              target,
              icon
            };
            socialLinksArray.push(socialLinkItem);
          });

          splitSmallLinks.forEach(link => {
            const fragments = link.split(",").map(fragment => fragment.trim());
            const text = fragments[0];
            const className = getClassName(text);
            const href = fragments[1];
            const target = fragments[2] === "blank" ? "_blank" : "";

            const smallLinkItem = {
              text,
              className,
              href,
              target
            };
            smallLinksArray.push(smallLinkItem);
          });

          let mainHeading = {};

          let loggedIn = Discourse.User.current();
          if(loggedIn){
            mainHeading = [];
            // const url = window.location.href;
            // let url = 'https://publichappinessmovement.com'
            // const dummyURL = 'https://publichappinessmovement.com/search?q=tags%3Aruby-on-rails'
            // const url = 'https://publichappinessmovement.com/tags/intersection/ux-design/voting';


            const userName = loggedIn.username
            // Home page links for logged in users
            if(url == '/'){
              mainHeading = [
                {title: 'Latest', text: 'Latest', link: '/latest'},
                {title: 'Stats', text: 'My Stats', link: `/u/${userName}/summary`},
                {title: 'Calendar', text: 'Calendar', link: `/${userName}/c/events/l/agenda`}
              ];
            }
            else{
              // Add main Discuss heading

              // Handles tag
              /*if(splittedURL.includes('tag')){
                const tag = splittedURL[splittedURL.length - 1];
                mainHeading.push({title: 'Discuss', text: 'Discuss', link: `/tag/${tag}`});
                mainHeading.push({title: 'Voting', text: 'Voting', link: `/tags/intersection/${tag}/voting`});
              }*/

              // Searched tags
              // Get tags from search. i.e : '/search?expanded=true&q=tags%3Amovies%2Cadventure-movie'
              const decodedURL = decodeURIComponent(url);


              // const splittedURL = decodedURL.split('/');
              // const tags = splittedURL[splittedURL.length - 1].split(',');


              const newSplittedURL = decodedURL.split('=');
              //console.log(newSplittedURL);
              
              if(newSplittedURL.length > 1){
                let newTags;

                if(newSplittedURL.length == 2){
                  newTags = newSplittedURL[0].split('/');
                }
                else{
                  newTags = newSplittedURL[2].split(':')[1];
                }

                console.log(newTags);


                if(newSplittedURL[0] === '/search?expanded' || newSplittedURL[0] === '/search?q'){
                  /*console.log(newSplittedURL);
                  // Handles tags
                  if (splittedURL.includes('tags')){
                    let newURL = '/tags/'
                    if(tags.length > 1){
                      newURL += 'intersection';
                      tags.forEach(tag => newURL += `/${tag}`);
                    }
                    else{
                      newURL += tags[0];
                    }
                    
                    if(newURL.length > 6){
                      mainHeading.push({title: 'Discuss', text: 'Discuss', link: newURL});
                    }

                    // Add Voting heading
                    //let votingURL = 'http://localhost:3000/tags/'
                    let votingURL = '/tags/';
                    if(tags.length > 1){
                      votingURL += 'intersection';
                      tags.forEach(tag => votingURL += `/${tag}`);
                    }
                    else{
                      votingURL += tags[0];
                    }
                    // console.log(tags);
                    if(votingURL.length > 6){
                      votingURL += '/voting';
                      mainHeading.push({title: 'Votes', text: 'Votes', link: votingURL});
                    }
                  }*/
                  mainHeading = [
                    {title: 'Latest', text: 'Latest', link: '/latest'},
                    {title: 'Stats', text: 'My Stats', link: `/u/${userName}/summary`},
                    {title: 'Calendar', text: 'Calendar', link: `/${userName}/c/events/l/agenda`}
                  ];
                }
                else{
                  /*mainHeading = [
                    {title: 'Latest', text: 'Latest', link: '/latest'},
                    {title: 'Stats', text: 'My Stats', link: `/u/${userName}/summary`},
                    {title: 'Calendar', text: 'Calendar', link: `/${userName}/c/events/l/agenda`}
                  ];*/

                  mainHeading = [
                    {title: 'Discuss', text: 'Discuss', link: `${newSplittedURL[0]}`},
                    {title: 'Voting', text: 'Voting', link: `/tags/intersection/${newSplittedURL[0].split('/')[2]}/voting`},
                    {title: 'Stats', text: 'Stats', link: `/u/${userName}/summary`},
                    {title: 'Tasks', text: 'Tasks', link: ''/*`/tag/${newSplittedURL[0].split('/')[2]}/l/latest`*/}
                  ];
                }
              }
              else{
                if(newSplittedURL[0].split('/')[1] === 'tags'){
                  console.log(newSplittedURL[0])

                  let urlItems = newSplittedURL[0].split('/')
                  let votingURL = '/tags'
                  urlItems.slice(2).forEach(tag => votingURL += `/${tag}`);
                  urlItems.pop();
                  urlItems.splice(0, urlItems.indexOf('intersection') + 1)

                  if(urlItems.indexOf('intersection')){
                    delete urlItems[urlItems.indexOf('intersection')]
                  }

                  let discussURL = urlItems.join('/');
                  mainHeading = [
                    {title: 'Discuss', text: 'Discuss', link: `/tag/${discussURL}`},
                    {title: 'Voting', text: 'Voting', link: votingURL},
                    {title: 'Stats', text: 'Stats', link: `/u/${userName}/summary`},
                    {title: 'Tasks', text: 'Tasks', link: `${newSplittedURL[0]}/l/latest`}
                  ];
                }
                else if(newSplittedURL[0].split('/')[1] === 'tag'){
                  console.log(`/tag/${newSplittedURL[0].split('/')[2]}/l/latest?board=default`)
                  mainHeading = [
                    {title: 'Discuss', text: 'Discuss', link: `${newSplittedURL[0]}`},
                    {title: 'Voting', text: 'Voting', link: `/tags/intersection/${newSplittedURL[0].split('/')[2]}/voting`},
                    {title: 'Stats', text: 'Stats', link: `/u/${userName}/summary`},
                    {title: 'Tasks', text: 'Tasks', link: '' /*`/tag/${newSplittedURL[0].split('/')[2]}/l/latest`*/}
                  ];
                }
                else{
                  mainHeading = [
                    {title: 'Latest', text: 'Latest', link: '/latest'},
                    {title: 'Stats', text: 'My Stats', link: `/u/${userName}/summary`},
                    {title: 'Calendar', text: 'Calendar', link: `/${userName}/c/events/l/agenda`}
                  ];
                }
              }
            }
          }
          else{
            mainHeading = [
              {title: 'About', text: 'About', link: 'https://publichappinessmovement.com/docuss/m_about'},
              {title: 'Join', text: 'Join', join: true, link: '#'},
              {title: 'CommunityValues', text: 'Community Values', link: 'https://news.focallocal.org/the-focallocal-community-values/'}
            ]
          }

          this.setProperties({
            mainHeading: mainHeading,
            blurb: settings.Blurb,
            linkSections: sectionsArray,
            smallLinks: smallLinksArray,
            socialLinks: socialLinksArray
          });
        } catch (error) {
          console.error(error);
          console.error(
            "There's an issue in the Easy Footer Component. Check if your settings are entered correctly"
          );
        }
      });
    });
  }
};
