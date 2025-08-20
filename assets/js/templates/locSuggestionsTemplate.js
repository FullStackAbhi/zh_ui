var locSuggestionsTemplate =
'{{#each location}}'+
'<option value="{{this}}"></option>'+
'{{/each}}';

Handlebars.registerPartial(
    "locSuggestions",
    locSuggestionsTemplate
);