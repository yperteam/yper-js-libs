import CallbackHelper from "./callback_helper";

/**
 * PasswordCheckerHelper used to check password
 */

export default class PasswordCheckerHelper {
    /** Check conditions */
    protected readonly checkLowerCaseLetters = /[a-z]/g;
    protected readonly checkUpperCaseLetters = /[A-Z]/g;
    protected readonly checkOneNumber = /[0-9]/g;
    protected readonly checkOneAlphaNumeric = /[!\"#\$%&'\(\)\*\+,-\./:;<=>\?@\[\\\]\^_`\{\|\}~]/g;
    protected readonly checkMaxLength = 8;

    /** Selectors */
    protected cHelper: CallbackHelper = new CallbackHelper();

    /** Selectors */
    protected $input: JQuery<HTMLElement> = null;
    protected $parentView: JQuery<HTMLElement>;
    protected $checkLowerCase: JQuery<HTMLElement>;
    protected $checkUpperCase: JQuery<HTMLElement>;
    protected $checkOneSpecialCharCase: JQuery<HTMLElement>;
    protected $checkOneNumberCase: JQuery<HTMLElement>;
    protected $checkLengthCase: JQuery<HTMLElement>;

    /**
     * Constructor
     */
    constructor(
        $input: JQuery<HTMLElement> = null,
        $parentView: JQuery<HTMLElement> = null
    ) {
        if ($input) {
            this.displayPassword();
            this.bindInputPassword($input);
        }
        this.$parentView = $parentView ? $parentView : $(this.renderChecksView());
        this.setCases();
    }
    /**
     *
     */
    public setCases() {
        this.$checkLowerCase = this.$parentView.find(".check-one-lower-case");
        this.$checkUpperCase = this.$parentView.find(".check-one-upper-case");
        this.$checkOneSpecialCharCase = this.$parentView.find(
            ".check-one-special-char"
        );
        this.$checkOneNumberCase = this.$parentView.find(".check-one-number");
        this.$checkLengthCase = this.$parentView.find(".check-length");
    }

    /**
     *
     * @param $input
     */
    public setInput($input: JQuery<HTMLElement>) {
        this.$input = $input;

        return this;
    }

    /**
     *
     */
    public getParentChecksView() {
        return this.$parentView;
    }

    /**
     *
     */
    public setValidationCallback(callback: Function) {
        if (callback instanceof Function) {
            this.cHelper.setCallback(callback);
        }

        return this;
    }

    /**
     *
     * @param $input
     */
    public bindInputPassword($input: JQuery<HTMLElement>) {
        this.setInput($input);
        this.$input.on("input", e => {
            this.checkValidCases(this.$input.val().toString());
        });
        this.$input.on("focusout", e => {
            this.checkInvalidCases(this.$input.val().toString());
        });
    }

    /**
     *
     * @param password
     */
    public checkValidCases(password: string) {
        let check: boolean = true;

        if (this.checkLowerCaseLetter(password)) {
            this.setValidCase(this.$checkLowerCase);
        } else {
            check = false;
            this.setBasicCase(this.$checkLowerCase);
        }
        if (this.checkUpperCaseLetter(password)) {
            this.setValidCase(this.$checkUpperCase);
        } else {
            check = false;
            this.setBasicCase(this.$checkUpperCase);
        }
        if (this.checkAlphaNumeric(password)) {
            this.setValidCase(this.$checkOneSpecialCharCase);
        } else {
            check = false;
            this.setBasicCase(this.$checkOneSpecialCharCase);
        }
        if (this.checkNumber(password)) {
            this.setValidCase(this.$checkOneNumberCase);
        } else {
            check = false;
            this.setBasicCase(this.$checkOneNumberCase);
        }
        if (this.checkLength(password)) {
            this.setValidCase(this.$checkLengthCase);
        } else {
            check = false;
            this.setBasicCase(this.$checkLengthCase);
        }

        this.cHelper.setParameters({
            is_checked: check,
            is_typing: true,
        });
        this.cHelper.call();

        return check;
    }

    /**
     *
     * @param password
     */
    public checkInvalidCases(password: string) {
        let check: boolean = true;

        if (!this.checkLowerCaseLetter(password)) {
            check = false;
            this.setInvalidCase(this.$checkLowerCase);
        }
        if (!this.checkUpperCaseLetter(password)) {
            check = false;
            this.setInvalidCase(this.$checkUpperCase);
        }
        if (!this.checkAlphaNumeric(password)) {
            check = false;
            this.setInvalidCase(this.$checkOneSpecialCharCase);
        }
        if (!this.checkNumber(password)) {
            check = false;
            this.setInvalidCase(this.$checkOneNumberCase);
        }
        if (!this.checkLength(password)) {
            check = false;
            this.setInvalidCase(this.$checkLengthCase);
        }

        this.cHelper.setParameters({
            is_checked: check,
            is_typing: false,
        });
        this.cHelper.call();

        return check;
    }

    /**
     *
     * @param password
     */
    public checkLowerCaseLetter(password: string) {
        return !!password.match(this.checkLowerCaseLetters);
    }

    /**
     *
     * @param password
     */
    public checkUpperCaseLetter(password: string) {
        return !!password.match(this.checkUpperCaseLetters);
    }

    /**
     *
     * @param password
     */
    public checkAlphaNumeric(password: string) {
        return !!password.match(this.checkOneAlphaNumeric);
    }

    /**
     *
     * @param password
     */
    public checkNumber(password: string) {
        return !!password.match(this.checkOneNumber);
    }

    /**
     *
     * @param password
     */
    public checkLength(password: string) {
        return password.length >= this.checkMaxLength;
    }

    public renderChecksView() {
        return `<div class="parent-checks row p-0 ml-2">
                 <div class="col-12 d-flex flex-column mt-4 parent-checks_content">
                    <span class="mb-2 condition--title">Doit contenir au minimum :</span>
                    <div class="condition--password d-flex flex-column flex-sm-row align-items-start">
                      <div class="mr-4">
                          <p class="check-length basic-check mb-0">
                              <i class="material-icons">fiber_manual_record</i>
                              <span>8 caractères</span>
                          </p>
                          <p class="check-one-lower-case basic-check mb-0">
                              <i class="material-icons">fiber_manual_record</i>
                              <span>1 minuscule</span>
                          </p>
                          <p class="check-one-upper-case basic-check mb-0">
                              <i class="material-icons">fiber_manual_record</i>
                              <span>1 majuscule</span>
                          </p>
                      </div>
                      <div>
                          <p class="check-one-special-char basic-check mb-0">
                              <i class="material-icons">fiber_manual_record</i>
                                <span>1 caractère spécial (ex : !?/$€%#) <i class="cf-information-circle popover--password ml-3" data-toggle="popover" title="<i class='cf-information-circle-full'></i> Caractères spéciaux acceptés :" data-placement="bottom" data-content='@ [ ! " # ( ) * / : ; = | ~'> </i></span>
                          </p>
                          <p class="check-one-number basic-check mb-0">
                              <i class="material-icons">fiber_manual_record</i>
                              <span>1 chiffre</span>
                          </p>
                      </div>
                    </div>
                </div>
              </div>`;
    }

    /**
     *
     * @param $case
     * @private
     */
    private setBasicCase($case: JQuery<HTMLElement>) {
        $case
            .removeClass("invalid")
            .removeClass("valid")
            .addClass("basic-check");
        $case.find("i").html("fiber_manual_record");
    }

    /**
     *
     * @param $case
     * @private
     */
    private setValidCase($case: JQuery<HTMLElement>) {
        $case
            .removeClass("invalid")
            .removeClass("basic-check")
            .addClass("valid");
        $case.find("i").html("check");
    }

    /**
     *
     * @param $case
     * @private
     */
    private setInvalidCase($case: JQuery<HTMLElement>) {
        $case
            .removeClass("valid")
            .removeClass("basic-check")
            .addClass("invalid");
        $case.find("i").html("close");
    }
    private displayPassword() {
        const $input = $("input");
        $(".visibility--picto").on("click", e => {
            const eCurrentTarget = $(e.currentTarget);

            eCurrentTarget.toggleClass("visibility");
            eCurrentTarget
                .parents()
                .find(".input-password")
                .each(e => {
                    if (eCurrentTarget.hasClass("visibility")) {
                        $input.attr("type", "text");
                        eCurrentTarget.html("visibility");
                    } else {
                        $input.attr("type", "password");
                        eCurrentTarget.html("visibility_off");
                    }
                });
        });
    }
}
