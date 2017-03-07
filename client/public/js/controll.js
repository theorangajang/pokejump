var keys = {};

function initControll()
{
    document.onkeydown=function(e)
    {
        keys[e.which] = true;

        return;
    };

    document.onkeyup=function(e){keys[e.which] = false}

    document.addEventListener('touchstart', function(e) {
        if(e.touches[0].pageX < window.innerWidth/2)//LEFT
        {
            keys[37] = true;
        }
        else
        {
            keys[39] = true;
        };

        if(e.touches.length >= 2)
        {
            keys[38] = true;
        }

    },false);

    document.addEventListener('touchend', function(e) {

        keys[39] = false;keys[37] = false; keys[38] = false;
    },false);
}