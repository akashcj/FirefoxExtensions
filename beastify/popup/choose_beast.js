browser.tabs.executeScript({file: "/content_scripts/beastify.js"})
.then(addClickHandler)
.catch(reportExecuteScriptError);


/* Function executed when an error is encountered*/
function reportExecuteScriptError(error)
{
    document.querySelector("#popup-content").classList.add("hidden");
    document.querySelector("#error-content").classList.remove("hidden");
    console.error("Beastify Script Failed with Error: ${error.message}");
}

function addClickHandler()
{
    document.addEventListener("click", function(e){listenForClicks(e);});
}

function listenForClicks(e)
{
    if (e.target.classList.contains("beast"))
    {
        browser.tabs.query({active:true, currentWindow:true})
        .then(beastify)
        .catch(reportError);
    }
    else
    {
        browser.tabs.query({active:true, currentWindow:true})
        .then(reset)
        .catch(reportError);
    }
}

function reportError(error)
{
    console.error('Got this error when trying to beastify ${error}');
}

const hidePage = 'body > :not(.beastify-image){ display:none; }';

function reset(tabs)
{
    browser.tabs.removeCSS ({code: hidePage})
    .then(()=>{
        browser.tabs.sendMessage(tabs[0].id, {command:"reset"});
    });
}
