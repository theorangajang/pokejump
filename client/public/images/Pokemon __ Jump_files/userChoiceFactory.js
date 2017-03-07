/**
 * Created by alexjag on 7/26/16.
 */
myApp.factory('userChoiceFactory', function () {
    var chosenPokemonIndex = {};
    var factory = {};

    factory.setChosenPokemon = function (pokemonIndex) {
        chosenPokemonIndex = pokemonIndex;
    };

    return factory;
});