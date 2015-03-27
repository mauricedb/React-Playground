/**
 * Created by Maurice on 3/27/2015.
 */

import Posters from './posters';

export default
class Movie {
    constructor(id, title, year, criticsConsensus, posters) {
        this.id = id;
        this.title = title;
        this.year = year;
        this.criticsConsensus = criticsConsensus;
        this.posters = posters;
        this.genres = [];
    }

    static fromJSON(json) {
        return new Movie(json.id, json.title, json.year, json.criticsConsensus, Posters.fromJSON(json.posters));
    }
}

