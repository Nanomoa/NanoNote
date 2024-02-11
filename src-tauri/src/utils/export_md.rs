use std::fs::File;
use std::io::{Error, Write};
use headless_chrome::LaunchOptions;
use headless_chrome::types::PrintToPdfOptions;
use crate::utils::html_splice;

pub struct ExportMd {
    content: String
}

impl ExportMd {
    pub fn new(_content: String) -> Self {
        ExportMd {
            content: _content
        }
    }

    pub fn to_html(&self, file_name: String) -> Result<(), Error> {
        let html_content = html_splice::HtmlSplice::new(self.content.clone()).get();

        let path = std::path::Path::new(&dirs::home_dir().unwrap()).join("NanoNote").join("Html");
        let path_str = path.to_str().unwrap();
        let output_path = format!("{}/{}", path_str, file_name);

        let mut html_file = match File::create(output_path) {
            Ok(file) => file,
            Err(e) => {
                return Err(e);
            }
        };
        
        if let Err(e) = html_file.write_all(html_content.as_bytes()) {
            Err(e)
        } else {
            Ok(())
        }
    }

    pub fn to_pdf(&self, file_name: String) -> Result<(), Error> {
        let path = std::path::Path::new("../nanomoa.html");
        let path_str = path.to_str().unwrap();

        let mut html_file = match File::create(path_str) {
            Ok(file) => file,
            Err(e) => {
                return Err(e);
            }
        };

        let absolute_path = std::fs::canonicalize(path).unwrap();
        let absolute_path_str = absolute_path.to_str().unwrap();

        let pdf_path = std::path::Path::new(&dirs::home_dir().unwrap()).join("NanoNote").join("Pdf");
        let pdf_path_str = pdf_path.to_str().unwrap();
        let output_path = format!("{}/{}", pdf_path_str, file_name);

        let html_content = html_splice::HtmlSplice::new(self.content.clone()).get();

        if let Err(e) = html_file.write_all(html_content.as_bytes()) {
            Err(e)
        } else {
            println!("Starting PDF conversion");
            let launch_options = LaunchOptions {
                sandbox: false,
                ..Default::default()
            };
            html2pdf::html_to_pdf(
                absolute_path_str,
                output_path,
                PrintToPdfOptions::default(),
                launch_options,
                None,
            ).expect("Error");
            std::fs::remove_file(path_str).expect("Error");
            println!("Finish PDF conversion");
            Ok(())
        }
    }
}