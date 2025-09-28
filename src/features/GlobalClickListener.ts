interface ClickObserveSub {
  call(): void;
}

export default class GlobalClickListener {

  static instance: GlobalClickListener;

  private observers: Set<ClickObserveSub> = new Set();

  constructor() {
    if (!GlobalClickListener.instance) {
      GlobalClickListener.instance = new GlobalClickListener();
    }

    return GlobalClickListener.instance;
  }

  public addSub(sub: ClickObserveSub) {

  }


}
