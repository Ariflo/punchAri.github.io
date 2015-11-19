/**
 * @constructor
 * A mole object represents a mole in the game.
 *
 * Moles need 3 variables
 *  - this.timeSpentUp: the amount of time a mole spends on the board before being removed
 *
 *  - this.occupiedHole: A DOM element representing the hole that a mole occupies
 *
 *  - this.moleElement: A DOM element that is created when a mole is created. This element
 *                 should be appended to occupiedHole when a mole emerges
 *
 */

function Mole(minUpTime, maxUpTime){

    // Give this.timeSpentUp a number value between minUpTime and maxUpTime.
    // HINT: use Mole.prototype.getRandomBetween

    this.timeSpentUp = this.getRandomIntBetween(minUpTime, maxUpTime);
    

    // this.removed needs a value
    this.removed = false;

    // this.occupiedHole needs a value. it should be a DOM element
    this.occupiedHole =  this.selectHole();

    // Create an HTML element to represent the Mole
    // and save it into this.moleElement
    // Don't forget to give our mole a proper css class!
    // Don't forget to call whackThisMole if the mole is clicked!
    this.moleElement = $('<div class="mole"></div>');
    this.moleElement2 = $('<img class="in-love" src="https://pbs.twimg.com/profile_images/378800000730001165/8ce2bcceb26e7343a6591cf5bbfb876f_400x400.jpeg">');
    $(this.moleElement).on("click", this.whackThisMole.bind(this));

    // Moles always emerge when they are created.
    this.emerge();
}


/**
 * A mole emerges from it's mole hole!
 * This function must:
 *   mark that hole as occupied using the data-hole-occupied attribute.
 *   add the mole to the DOM. 
 *   use setTimeout() to remove the mole after this.timeSpentUp milliseconds
 *
 */
Mole.prototype.emerge = function() {

     $(this.occupiedHole).attr('data-hole-occupied','true');
     $(this.occupiedHole).append(this.moleElement);
     
      setTimeout(this.removeMole.bind(this), this.timeSpentUp);

};

/**
 * This function should change a mole from the default state, to the
 * whacked state.
 * 
 * It should use the global variable scoreBoard to update the score.
 * This should change the data-score attribute, as well as what the 
 * user can see on the screen.
 *
 * It should cause the foundLove.png heart to appear behind the mole.
 * 
 * Then after one second it should remove the mole from the DOM.
 */
Mole.prototype.whackThisMole = function() {
    this.removed = true;

    var score = $(scoreBoard).attr('data-score');
    score ++;

    $(scoreBoard).attr('data-score',score.toString());
    $(scoreBoard).html(score);

    //$(this.occupiedHole).slideUp(this.moleElement);
    //$(this.occupiedHole).slideDown(this.moleElement2);
    //$(this.occupiedHole).remove(this.moleElement );
    //$(this.occupiedHole).append(this.moleElement2);

    //$(this.occupiedHole).add(this.moleElement2);
    $(this.occupiedHole).removeClass("mole-hole").append(this.moleElement2);

    setTimeout(this.removeMole.bind(this), 1000);

};

/**
 * This function should remove the moleElement from the DOM.
 * It should also change the data-hole-occupied attribute back to
 * false so that other moles can occupy the hole. 
 */
Mole.prototype.removeMole = function() {

           $(this.occupiedHole).empty();
           $(this.occupiedHole).removeClass('in-love').addClass( "mole-hole" );
           $(this.occupiedHole).attr('data-hole-occupied','false');

};

/**
 * Select an element from the DOM. The element must be one of the 
 * mole holes and it must have an attriute data-hole-occupied with
 * a value of false. ;
 * 
 * If all those conditions are met, return an HTML element. 
 * If those conditions cannot be met (i.e. every hole is already occupied)
 * then return undefined.
 */
Mole.prototype.selectHole = function() {

    var moleHoles = $('.mole-hole');
    var randomHole; 
    var randomNum = this.getRandomIntBetween(0, moleHoles.length);

    for(var i = 0; i < moleHoles.length; i++){

        if ($(moleHoles[randomNum]).attr('data-hole-occupied') === 'false' ){
            
                randomHole = moleHoles[randomNum]; 
        } 

    }
        return randomHole;

};

/**
 * This must return a random number in between min and max.
 */
Mole.prototype.getRandomBetween = function(min, max) {

    return Math.floor(Math.random() * (max - min + 1)) + min;

};

/**
 * This must return an integer in between min and max
 */
Mole.prototype.getRandomIntBetween = function(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};


