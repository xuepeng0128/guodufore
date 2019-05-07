export class Icon {
    iconUrl : string;

  constructor(options :{ iconUrl?: string}={}) {
    this.iconUrl = options.iconUrl || '';
  }
}
