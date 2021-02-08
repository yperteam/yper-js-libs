import { AjaxCallbackError } from "../error/yper_exception";
import { AbstractLib } from "../libs/abstract_lib";

/**
 * UploadHelper class
 * Object to manage file(s) to
 */
export class UploadHelper {
    /** user data */
    private path: string = null;
    private formData: FormData = new FormData();

    /**
     * @constructor
     */
    constructor(path: string = null) {
        this.path = path;
    }

    /**
     * Append File to upload
     * @param name: name of the file
     * @param value: file of type string or Blob
     * @param fileName
     */
    public append(name: string, value: string | Blob, fileName: string) {
        this.formData.append(name, value, fileName);
    }

    /**
     * Set new path for future ajax call
     * @param path: new path
     */
    public setPath(path: string) {
        this.path = path;
    }

    /**
     * Clear all files
     * May use after ajax call
     */
    public refreshFormData() {
        this.formData = new FormData();
    }

    /**
     * Upload file(s) to the URL path
     */
    public async upload() {
        return new Promise((resolve, reject) => {
            $.ajax({
                url: this.path,
                data: this.formData,
                processData: false,
                contentType: false,
                cache: false,
                type: "POST",
            })
                .fail(r => {
                    reject(AbstractLib.failProcess(r));
                })
                .then(data => {
                    resolve(data);
                });
        });
    }
}
