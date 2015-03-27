/**
 * Created by Maurice on 3/27/2015.
 */

export default
class Posters {
    constructor(profile) {
        this.profile = profile;
    }

    static fromJSON(json) {
        return new Posters(json.profile);
    }
}