$(document).ready(function () {
    let hash = window.location.hash;
    const regex = /^#action-[1-3][abc]?$/g;
    const found = hash.match(regex);
    if (found) {

        if (hash.length == 10) {
            // hash is an inner accordion, open parent accordion first
            const action_parent = hash.substring(0, 9) + "-content";
            $(action_parent).collapse('show');
        }

        const hash_content = hash + "-content";
        const hash_content_id  = hash_content.substring(1);
        const hash_header = hash + "-header";

        // navigate to accordion hash, if present in URL location and only when page first loads
        // setup event listener to handle this one time navigation handling
        const myCollapsible = document.getElementById(hash_content_id);
        let handler = function(event) {
            navigationFn.goToSection(hash_header);
            if (myCollapsible !== null) {
                myCollapsible.removeEventListener('shown.bs.collapse', handler);
            }
        };
        if (myCollapsible !== null) {
            myCollapsible.addEventListener('shown.bs.collapse', handler);
        }

        // open accordion
        $(hash_content).collapse('show');
    }
});

const navigationFn = {
    goToSection: function(id) {
        $('html, body').animate({
            scrollTop: $(id).offset().top - 5
        }, 0);
    }
}
